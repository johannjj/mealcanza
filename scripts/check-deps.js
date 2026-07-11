const { existsSync } = require('fs');
const { join } = require('path');

const root = join(__dirname, '..');
const required = [
  ['expo', 'Dependencias base'],
  ['expo-asset', 'Metro / assets (npm install)'],
  ['react-native-web', 'Solo si abres web con `w` — npm install'],
];

for (const [pkg, hint] of required) {
  const pkgPath = join(root, 'node_modules', pkg, 'package.json');
  if (!existsSync(pkgPath)) {
    console.error(`\n❌ Falta el paquete "${pkg}". ${hint}.\n`);
    console.error('   npm install');
    console.error('   npx expo install --fix');
    console.error('   npm start\n');
    console.error('   Para Android usa Expo Go (QR), no hace falta web.\n');
    process.exit(1);
  }
}
