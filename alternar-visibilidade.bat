@echo off
rem Alterna a visibilidade do showcase publico (github.com/fredhlima/sistema-solar-web)
rem entre privado e publico, usando o gh CLI ja autenticado nesta maquina.
rem
rem Uso:
rem   alternar-visibilidade.bat            -> mostra a visibilidade atual
rem   alternar-visibilidade.bat publico    -> torna o repo publico (reativa o GitHub Pages)
rem   alternar-visibilidade.bat privado    -> torna o repo privado (o Pages para de funcionar
rem                                           a menos que a conta tenha GitHub Pro/Team/Enterprise)
setlocal
set REPO=fredhlima/sistema-solar-web

if "%~1"=="" goto mostrar
if /i "%~1"=="publico" goto publico
if /i "%~1"=="privado" goto privado
echo Uso: alternar-visibilidade.bat [publico^|privado]
goto fim

:mostrar
echo Visibilidade atual:
gh repo view %REPO% --json visibility -q .visibility
goto fim

:publico
gh repo edit %REPO% --visibility public --accept-visibility-change-consequences
if errorlevel 1 goto erro
echo.
echo Repositorio tornado PUBLICO.
echo GitHub Pages volta a funcionar em ~1 min: https://fredhlima.github.io/sistema-solar-web/
goto fim

:privado
gh repo edit %REPO% --visibility private --accept-visibility-change-consequences
if errorlevel 1 goto erro
echo.
echo Repositorio tornado PRIVADO.
echo ATENCAO: GitHub Pages com repo privado exige plano GitHub Pro/Team/Enterprise.
echo Em conta gratuita, o link do showcase (https://fredhlima.github.io/sistema-solar-web/) fica fora do ar ate voltar a ficar publico.
goto fim

:erro
echo ERRO ao alterar a visibilidade. Nada foi mudado (ou mudou parcialmente - confira com "alternar-visibilidade.bat").

:fim
endlocal
