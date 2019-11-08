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
                    $Start = get-date $s -format 'yyyy-MM-dd'
                    $to = (Get-UDElement -Id "Picker").Attributes.to
                    [datetime]$e = "$to"
                    $End = get-date $e -format 'yyyy-MM-dd'
                    show-udtoast -message "You Selected $Start until $End" -duration 5000 -Position center



                }
            }

        }
    }
)
