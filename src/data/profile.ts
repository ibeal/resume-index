export interface Profile {
  name: string;
  title: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export const profile: Profile = {
  name: "Ian Beal",
  title: "Software Engineer III",
  email: "ian.b255@gmail.com",
  github: "github.com/ibeal",
  linkedin: "linkedin.com/in/ian-beal/",
  location: "Remote",
};

export interface Education {
  school: string;
  degree: string;
  honors?: string;
  yearStart: number;
  yearEnd: number;
}

export const education: Education[] = [
  {
    school: "Utah Valley University",
    degree: "B.S. Computer Science",
    honors: "Magna Cum Laude",
    yearStart: 2017,
    yearEnd: 2021,
  },
];

export interface Certification {
  name: string;
}

export const certifications: Certification[] = [
  { name: "Azure Associate Developer" },
  { name: "Azure Fundamentals" },
  { name: "Azure Machine Learning Fundamentals" },
  { name: "LaunchDarkly Silver Certificate" },
  { name: "GitHub Foundations" },
];
