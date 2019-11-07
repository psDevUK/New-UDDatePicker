Import-Module -Name UniversalDashboard.Community
Import-Module "C:\ud\UDatePicker\Working\src\output\UniversalDashboard.UDDatePicker\UniversalDashboard.UDDatePicker.psd1"
Get-UDDashboard | Stop-UDDashboard
Start-UDDashboard -Port 10005 -Dashboard (
    New-UDDashboard -Title "Powershell UniversalDashboard" -BackgroundColor 'white' -Content {
        New-UDRow -Columns {
            New-UDColumn -size 6 -Content {
                New-UDDatePicker -Id "Picker"
                New-UDButton -Text "Get Dates" -OnClick {
                    $from = (Get-UDElement -Id "Picker").Attributes.from
                    $to = (Get-UDElement -Id "Picker").Attributes.to
                    show-udtoast -message "You Selected $from until $to" -duration 5000 -Position center


                }
            }

        }
    }
)
