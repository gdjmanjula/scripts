@echo off
echo.���᮪ 㢮������ �� ��襤��� ������: > C:\scripts\fired-weekly\fired-weekly.txt
echo. >> C:\scripts\fired-weekly\fired-weekly.txt
call sqlcmd -S "BOSS\ORACLENT" -i "C:\scripts\fired-weekly\fired-weekly.sql" -E -d "��������" -w 80 >> C:\scripts\fired-weekly\fired-weekly.txt
echo. >> C:\scripts\fired-weekly\fired-weekly.txt
echo.�� ����室����� ���������� ᮮ⢥�����騥 ���� �����. >> C:\scripts\fired-weekly\fired-weekly.txt
call c:\scripts\fired-weekly\blat.exe c:\scripts\fired-weekly\fired-weekly.txt -to alerts@atriarussia.ru -sf c:\scripts\fired-weekly\subject.txt -server 194.186.104.60 -f info@campomos.ru -charset CP866