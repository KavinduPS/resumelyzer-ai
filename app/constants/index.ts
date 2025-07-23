import type { Resume } from "types";

export const resumes: Resume[] = [
  {
    id: 1,
    companyName: "TechNova Inc.",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume1.jpg",
    resumePath: "/resumes/resume1.pdf",
    feedback: {
      overallScore: 78,
      ATS: {
        score: 80,
        tips: [
          {
            type: "improve",
            tip: "Include relevant keywords",
            explanation:
              "ATS systems scan for job-specific terms—missing these reduces match rate.",
          },
          {
            type: "good",
            tip: "Used standard job title",
            explanation:
              "Common titles help ATS systems categorize your resume accurately.",
          },
        ],
      },
      toneAndStyle: {
        score: 75,
        tips: [
          {
            type: "improve",
            tip: "Avoid casual language",
            explanation: "Using terms like 'kinda' may sound unprofessional.",
          },
        ],
      },
      content: {
        score: 70,
        tips: [
          {
            type: "improve",
            tip: "Add measurable achievements",
            explanation:
              "Quantifying impact strengthens your resume's effectiveness.",
          },
        ],
      },
      structure: {
        score: 85,
        tips: [
          {
            type: "good",
            tip: "Consistent formatting",
            explanation: "Uniform fonts and layout improve readability.",
          },
        ],
      },
      skills: {
        score: 80,
        tips: [
          {
            type: "good",
            tip: "Listed key frontend frameworks",
            explanation:
              "Mentioning React and VueJS shows tech stack compatibility.",
          },
        ],
      },
    },
  },
  {
    id: 2,
    companyName: "HealthTech Solutions",
    jobTitle: "Data Analyst",
    imagePath: "/images/resume2.png",
    resumePath: "/resumes/resume2.pdf",
    feedback: {
      overallScore: 84,
      ATS: {
        score: 88,
        tips: [
          {
            type: "good",
            tip: "Included relevant data keywords",
            explanation:
              "Mentions tools like SQL, Excel, and Tableau which are crucial for ATS.",
          },
          {
            type: "improve",
            tip: "Standardize section headings",
            explanation:
              "ATS may not recognize custom headings like 'Life Journey'.",
          },
        ],
      },
      toneAndStyle: {
        score: 82,
        tips: [
          {
            type: "good",
            tip: "Professional and clear language",
            explanation:
              "Tone maintains a confident and concise narrative throughout.",
          },
        ],
      },
      content: {
        score: 85,
        tips: [
          {
            type: "good",
            tip: "Highlights impact with metrics",
            explanation:
              "Statements like 'reduced reporting time by 30%' improve credibility.",
          },
        ],
      },
      structure: {
        score: 78,
        tips: [
          {
            type: "improve",
            tip: "Align section spacing",
            explanation:
              "Inconsistent padding between sections affects readability.",
          },
        ],
      },
      skills: {
        score: 86,
        tips: [
          {
            type: "good",
            tip: "Balanced technical and soft skills",
            explanation:
              "Skills section lists tools, languages, and communication strengths.",
          },
        ],
      },
    },
  },
  {
    id: 3,
    companyName: "FinEdge Corp",
    jobTitle: "Product Manager",
    imagePath: "/images/resume3.png",
    resumePath: "/resumes/resume3.pdf",
    feedback: {
      overallScore: 71,
      ATS: {
        score: 72,
        tips: [
          {
            type: "improve",
            tip: "Clarify role descriptions",
            explanation:
              "Some job titles are too generic—ATS may fail to match them with openings.",
          },
        ],
      },
      toneAndStyle: {
        score: 68,
        tips: [
          {
            type: "improve",
            tip: "Sound more results-driven",
            explanation:
              "Phrases like 'helped with' are weak—use 'led', 'spearheaded', etc.",
          },
        ],
      },
      content: {
        score: 75,
        tips: [
          {
            type: "improve",
            tip: "Highlight leadership outcomes",
            explanation:
              "Mention specific outcomes from cross-functional collaboration.",
          },
        ],
      },
      structure: {
        score: 70,
        tips: [
          {
            type: "improve",
            tip: "Use consistent font sizes",
            explanation:
              "Varying font sizes across roles breaks visual hierarchy.",
          },
        ],
      },
      skills: {
        score: 65,
        tips: [
          {
            type: "improve",
            tip: "Include product management tools",
            explanation:
              "Missing tools like Jira, Trello, and roadmapping software reduces relevance.",
          },
        ],
      },
    },
  },
  {
    id: 4,
    companyName: "TechNova Inc.",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume1.jpg",
    resumePath: "/resumes/resume1.pdf",
    feedback: {
      overallScore: 78,
      ATS: {
        score: 80,
        tips: [
          {
            type: "improve",
            tip: "Include relevant keywords",
            explanation:
              "ATS systems scan for job-specific terms—missing these reduces match rate.",
          },
          {
            type: "good",
            tip: "Used standard job title",
            explanation:
              "Common titles help ATS systems categorize your resume accurately.",
          },
        ],
      },
      toneAndStyle: {
        score: 75,
        tips: [
          {
            type: "improve",
            tip: "Avoid casual language",
            explanation: "Using terms like 'kinda' may sound unprofessional.",
          },
        ],
      },
      content: {
        score: 70,
        tips: [
          {
            type: "improve",
            tip: "Add measurable achievements",
            explanation:
              "Quantifying impact strengthens your resume's effectiveness.",
          },
        ],
      },
      structure: {
        score: 85,
        tips: [
          {
            type: "good",
            tip: "Consistent formatting",
            explanation: "Uniform fonts and layout improve readability.",
          },
        ],
      },
      skills: {
        score: 80,
        tips: [
          {
            type: "good",
            tip: "Listed key frontend frameworks",
            explanation:
              "Mentioning React and VueJS shows tech stack compatibility.",
          },
        ],
      },
    },
  },
  {
    id: 5,
    companyName: "HealthTech Solutions",
    jobTitle: "Data Analyst",
    imagePath: "/images/resume2.png",
    resumePath: "/resumes/resume2.pdf",
    feedback: {
      overallScore: 84,
      ATS: {
        score: 88,
        tips: [
          {
            type: "good",
            tip: "Included relevant data keywords",
            explanation:
              "Mentions tools like SQL, Excel, and Tableau which are crucial for ATS.",
          },
          {
            type: "improve",
            tip: "Standardize section headings",
            explanation:
              "ATS may not recognize custom headings like 'Life Journey'.",
          },
        ],
      },
      toneAndStyle: {
        score: 82,
        tips: [
          {
            type: "good",
            tip: "Professional and clear language",
            explanation:
              "Tone maintains a confident and concise narrative throughout.",
          },
        ],
      },
      content: {
        score: 85,
        tips: [
          {
            type: "good",
            tip: "Highlights impact with metrics",
            explanation:
              "Statements like 'reduced reporting time by 30%' improve credibility.",
          },
        ],
      },
      structure: {
        score: 78,
        tips: [
          {
            type: "improve",
            tip: "Align section spacing",
            explanation:
              "Inconsistent padding between sections affects readability.",
          },
        ],
      },
      skills: {
        score: 86,
        tips: [
          {
            type: "good",
            tip: "Balanced technical and soft skills",
            explanation:
              "Skills section lists tools, languages, and communication strengths.",
          },
        ],
      },
    },
  },
  {
    id: 6,
    companyName: "FinEdge Corp",
    jobTitle: "Product Manager",
    imagePath: "/images/resume3.png",
    resumePath: "/resumes/resume3.pdf",
    feedback: {
      overallScore: 71,
      ATS: {
        score: 72,
        tips: [
          {
            type: "improve",
            tip: "Clarify role descriptions",
            explanation:
              "Some job titles are too generic—ATS may fail to match them with openings.",
          },
        ],
      },
      toneAndStyle: {
        score: 68,
        tips: [
          {
            type: "improve",
            tip: "Sound more results-driven",
            explanation:
              "Phrases like 'helped with' are weak—use 'led', 'spearheaded', etc.",
          },
        ],
      },
      content: {
        score: 75,
        tips: [
          {
            type: "improve",
            tip: "Highlight leadership outcomes",
            explanation:
              "Mention specific outcomes from cross-functional collaboration.",
          },
        ],
      },
      structure: {
        score: 70,
        tips: [
          {
            type: "improve",
            tip: "Use consistent font sizes",
            explanation:
              "Varying font sizes across roles breaks visual hierarchy.",
          },
        ],
      },
      skills: {
        score: 65,
        tips: [
          {
            type: "improve",
            tip: "Include product management tools",
            explanation:
              "Missing tools like Jira, Trello, and roadmapping software reduces relevance.",
          },
        ],
      },
    },
  },
];
