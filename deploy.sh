ssh -4 -t -t root@78.141.237.69 << EOF
sv force-stop brp
exit
EOF
rsync -zrvhtLk --delete --force ./dist/ root@78.141.237.69:/etc/sv/brp/brp

ssh -4 -t -t root@78.141.237.69 << EOF
sv start brp
exit
EOF

date +"Completed %H.%M.%S %d/%m/%Y"
