import * as pdfjs from 'pdfjs-dist';
import { Profile } from '@/types/profile';

// Set worker path for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export async function extractProfileFromPDF(pdfPath: string): Promise<Profile> {
  try {
    const pdf = await pdfjs.getDocument(pdfPath).promise;
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();
    const text = textContent.items.map((item: any) => item.str).join(' ');



    // Parse the text content into profile sections
    const profile: Profile = {
      name: extractField(text, 'Name:', '\n') || "Prashant Nagpal",
      title: extractField(text, 'Title:', '\n') || "Head of Finance",
      tagline: extractField(text, 'Tagline:', '\n') || "Experienced finance leader with expertise in financial strategy",
      about: {
        overview: [extractField(text, 'Overview:', '\n')].filter(Boolean),
        specialties: extractField(text, 'Specialties:', '\n')?.split(',').map(s => s.trim()) || [],
        philosophy: extractField(text, 'Philosophy:', '\n') || ""
      },
      education: [
        {
          degree: extractField(text, 'Degree:', '\n') || "MBA, Finance",
          institution: extractField(text, 'Institution:', '\n') || "INSEAD Business School",
          year: extractField(text, 'Year:', '\n') || "2014",
          description: extractField(text, 'Description:', '\n') || ""
        }
      ],
      skills: [
        {
          category: "Financial Management",
          items: [
            { name: "Financial Strategy", level: 95 },
            { name: "Budgeting & Forecasting", level: 90 }
          ]
        }
      ],
      experience: [
        {
          id: "current",
          company: extractField(text, 'Company:', '\n') || "GetYourGuide",
          position: extractField(text, 'Position:', '\n') || "Head of Finance",
          location: extractField(text, 'Location:', '\n') || "Berlin, Germany",
          period: extractField(text, 'Period:', '\n') || "Jan 2021 - Present",
          description: [{
            text: extractField(text, 'Experience:', '\n') || "",
            subPoints: []
          }].filter(item => item.text)
        }
      ],
      contact: {
        linkedin: extractField(text, 'LinkedIn:', '\n') || "https://www.linkedin.com/in/nagpal-p/",
        location: extractField(text, 'Location:', '\n') || "Berlin, Germany"
      }
    };

    return profile;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

function extractField(text: string, startMarker: string, endMarker: string): string {
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) return '';
  
  const contentStart = startIndex + startMarker.length;
  const endIndex = text.indexOf(endMarker, contentStart);
  
  if (endIndex === -1) return text.slice(contentStart).trim();
  return text.slice(contentStart, endIndex).trim();
} 