
# AURA BATTLE ARENA - Build sin compu

## Cómo publicar sin compu (solo celular)

### Paso 1: Crea repo en GitHub (desde el celular)
1. Ve a github.com/new en tu celular
2. Nombre: aura-battle-arena
3. Público, con README
4. Crear

### Paso 2: Sube los archivos (desde celular)
1. En tu repo, click Add file > Upload files
2. Sube TODOS los archivos de esta carpeta aura-expo:
   - package.json, app.json, eas.json
   - carpeta app/ con index.tsx
   - carpeta .github/workflows/build.yml
   - index.html (política)

### Paso 3: Consigue EXPO_TOKEN (2 min)
1. Ve a expo.dev/signup (desde celular)
2. Crea cuenta
3. Ve a expo.dev/settings/access-tokens > Create new token > Copia

### Paso 4: Pon el token en GitHub
1. En tu repo github.com/tu-usuario/aura-battle-arena/settings/secrets/actions
2. New repository secret
3. Name: EXPO_TOKEN
4. Value: pega tu token de expo
5. Add secret

### Paso 5: ¡Build automático!
1. Cada vez que subas un archivo, GitHub hace el build solo
2. Ve a Actions > Verás "Build AAB para Play Store" corriendo
3. En 15 min te da el .aab listo para Play Store
4. Descárgalo desde expo.dev (te llega email)

### Alternativa aún más fácil:
Si no quieres GitHub Actions, solo sube a expo.dev directamente:
1. Ve a expo.dev > New Project > Import from GitHub > Selecciona tu repo
2. Click Build > Android > AAB > Build
3. Te da el .aab sin usar compu

## Link de privacidad
Sube index.html a tiiny.host desde el celular para obtener https://
