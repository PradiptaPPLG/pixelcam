Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem 'public\templates\trending*.png' | Sort-Object { [int]($_.BaseName -replace 'trending', '') }

foreach ($f in $files) {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    $bmp = New-Object System.Drawing.Bitmap($img)
    $w = $bmp.Width
    $h = $bmp.Height

    # 1. Count transparent pixels for each row to find Y bands
    $rowTransparency = New-Object int[] $h
    for ($y = 0; $y -lt $h; $y++) {
        $transCount = 0
        for ($x = 0; $x -lt $w; $x++) {
            $c = $bmp.GetPixel($x, $y)
            if ($c.A -lt 50) {
                $transCount++
            }
        }
        $rowTransparency[$y] = $transCount
    }

    # 2. Group rows into contiguous transparent bands
    $bands = @()
    $inBand = $false
    $start = 0
    $minRowWidthThreshold = [Math]::Max(5, [int]($w * 0.05))

    for ($y = 0; $y -lt $h; $y++) {
        if ($rowTransparency[$y] -ge $minRowWidthThreshold) {
            if (-not $inBand) {
                $start = $y
                $inBand = $true
            }
        } else {
            if ($inBand) {
                $bands += @{ start = $start; end = $y - 1 }
                $inBand = $false
            }
        }
    }
    if ($inBand) {
        $bands += @{ start = $start; end = $h - 1 }
    }

    # If we got more than 3 bands, keep the 3 largest ones by height
    if ($bands.Count -gt 3) {
        $bands = $bands | Sort-Object { $_.end - $_.start } -Descending | Select-Object -First 3 | Sort-Object { $_.start }
    }

    if ($bands.Count -eq 3) {
        $slotsStr = ""
        for ($i = 0; $i -lt 3; $i++) {
            $b = $bands[$i]
            $minY = $b.start
            $maxY = $b.end

            # Find X boundaries within this Y band, scanning from 15% to 85% of width to avoid side decoration transparency
            $scanXStart = [int]($w * 0.15)
            $scanXEnd = [int]($w * 0.85)

            $minX = $w
            $maxX = 0

            for ($y = $minY; $y -le $maxY; $y++) {
                for ($x = $scanXStart; $x -le $scanXEnd; $x++) {
                    $c = $bmp.GetPixel($x, $y)
                    if ($c.A -lt 50) {
                        if ($x -lt $minX) { $minX = $x }
                        if ($x -gt $maxX) { $maxX = $x }
                    }
                }
            }

            # Fallback if no transparent pixels in middle 70%
            if ($minX -gt $maxX) {
                $minX = 0
                $maxX = $w - 1
            }

            $xPct = [Math]::Round(($minX / $w) * 100, 2)
            $yPct = [Math]::Round(($minY / $h) * 100, 2)
            $wPct = [Math]::Round((($maxX - $minX + 1) / $w) * 100, 2)
            $hPct = [Math]::Round((($maxY - $minY + 1) / $h) * 100, 2)

            # Round coordinates to match format nicely
            $slotsStr += "{ xPct: $xPct, yPct: $yPct, widthPct: $wPct, heightPct: $hPct }"
            if ($i -lt 2) { $slotsStr += ", " }
        }
        Write-Host ("  { id: `"" + $f.BaseName + "`", slots: [ " + $slotsStr + " ] },")
    } else {
        Write-Host ("  # Could not resolve 3 bands for " + $f.Name + " (found " + $bands.Count + ")")
    }

    $bmp.Dispose()
    $img.Dispose()
}
