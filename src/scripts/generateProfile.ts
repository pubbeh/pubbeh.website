import { extractProfileFromPDF } from '../services/pdfService';
import * as fs from 'fs';
import * as path from 'path';

async function generateProfile() {
  try {
    // Read from PDF in public directory
    const pdfPath = path.join(process.cwd(), 'public', 'profile.pdf');
    const profile = await extractProfileFromPDF(pdfPath);

    // Generate the profile.ts content
    const profileContent = `import { Profile } from '@/types/profile';

export const profileData: Profile = ${JSON.stringify(profile, null, 2)};
`;

    // Write to profile.ts
    const outputPath = path.join(process.cwd(), 'src', 'data', 'profile.ts');
    fs.writeFileSync(outputPath, profileContent);

    console.log('Profile data successfully generated from PDF!');
  } catch (error) {
    console.error('Error generating profile:', error);
  }
}

generateProfile(); 