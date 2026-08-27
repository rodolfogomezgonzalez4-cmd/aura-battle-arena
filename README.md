
# AURA BATTLE ARENA - EXPO LISTO PARA PLAY STORE

## Pasos para subir con Google Pay + Billing

1. npm install
2. Crea cuenta en revenuecat.com (maneja Google Play Billing 6.0) - pega tu API key en app/index.tsx
3. En Google Play Console crea productos: aura_premium_monthly ($4.99) y aura_premium_yearly ($29.99)
4. eas build -p android --profile production
5. Sube el .aab a Play Console

## Permisos ya incluidos en app.json
- CAMERA, RECORD_AUDIO, BILLING, Google Pay

## Funciones
- 130+ gestos, buscador, Mis Gestos custom, Paywall premium, Batalla Épica, Pasar y Jugar por turnos

## Test de pagos
Agrega tu email en Play Console > Configuración > Pruebas de licencia para probar sin cobrar real.
