import { extractProfileFromPDF } from '../src/services/pdfService.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateProfile() {
  try {
    // Read from PDF in public directory
    const pdfPath = join(__dirname, '..', 'public', 'profile.pdf');
    const profile = await extractProfileFromPDF(pdfPath);

    // Generate the profile.ts content
    const profileContent = `import { Profile } from '@/types/profile';

export const profileData: Profile = ${JSON.stringify(profile, null, 2)};
`;

    // Write to profile.ts
    const outputPath = join(__dirname, '..', 'src', 'data', 'profile.ts');
    writeFileSync(outputPath, profileContent);

    console.log('Profile data successfully generated from PDF!');
  } catch (error) {
    console.error('Error generating profile:', error);
  }
}

generateProfile(); 