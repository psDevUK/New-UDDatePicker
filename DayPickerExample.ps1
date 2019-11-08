Import-Module -Name UniversalDashboard.Community
Import-Module UniversalDashboard.UDDatePicker
Get-UDDashboard | Stop-UDDashboard
Start-UDDashboard -Port 10005 -Dashboard (
    New-UDDashboard -Title "Powershell UniversalDashboard" -BackgroundColor 'white' -Content {
        New-UDRow -Columns {
            New-UDColumn -size 6 -Content {
                New-UDDatePicker -Id "Picker"
                New-UDButton -Text "Get Dates" -OnClick {
                     $from = (Get-UDElement -Id "Picker").Attributes.from
                    [datetime]$s = "$from"
                    $Start = "$($s.Date.Year)-$($s.Date.Month)-$($s.Date.Day)"
                    $to = (Get-UDElement -Id "Picker").Attributes.to
                    [datetime]$e = "$to"
                    $End = "$($e.Date.Year)-$($e.Date.Month)-$($e.Date.Day)"
                    show-udtoast -message "You Selected $Start until $End" -duration 5000 -Position center


                }
            }

        }
    }
)
