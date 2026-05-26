import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const IMAGES = [
  "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
];

type CollegeSeed = {
  name: string;
  location: string;
  city: string;
  state: string;
  fees: number;
  rating: number;
  avgPackage: number;
  established: number;
  type: string;
  courses: string[];
  overview: string;
};

const colleges: CollegeSeed[] = [
  {
    name: "IIT Madras",
    location: "Adyar, Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    fees: 120000,
    rating: 4.9,
    avgPackage: 2200000,
    established: 1959,
    type: "Public/Govt",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Electrical Engineering",
      "B.Tech Mechanical Engineering",
      "M.Tech Data Science",
      "MBA",
      "Ph.D Engineering",
    ],
    overview:
      "IIT Madras is India's top-ranked engineering institute, known for cutting-edge research and strong industry partnerships. Its sprawling campus on the banks of the Adyar river hosts world-class labs and incubation centers.",
  },
  {
    name: "IIT Bombay",
    location: "Powai, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    fees: 150000,
    rating: 4.9,
    avgPackage: 2500000,
    established: 1958,
    type: "Public/Govt",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Chemical Engineering",
      "B.Tech Aerospace Engineering",
      "M.Tech AI & ML",
      "MBA",
      "Ph.D Sciences",
    ],
    overview:
      "IIT Bombay sits in the financial capital and consistently leads placement charts with premium recruiters. The institute is renowned for entrepreneurship culture and interdisciplinary innovation across engineering and design.",
  },
  {
    name: "IIT Delhi",
    location: "Hauz Khas, New Delhi",
    city: "Delhi",
    state: "Delhi",
    fees: 140000,
    rating: 4.8,
    avgPackage: 2300000,
    established: 1961,
    type: "Public/Govt",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Electrical Engineering",
      "B.Tech Production Engineering",
      "M.Tech Robotics",
      "MBA",
      "Ph.D Management",
    ],
    overview:
      "IIT Delhi offers exceptional proximity to policy, industry, and research ecosystems in the national capital. Students benefit from strong faculty mentorship and a vibrant startup scene on campus.",
  },
  {
    name: "IIT Kharagpur",
    location: "Kharagpur, West Bengal",
    city: "Kharagpur",
    state: "West Bengal",
    fees: 80000,
    rating: 4.8,
    avgPackage: 2000000,
    established: 1951,
    type: "Public/Govt",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Mining Engineering",
      "B.Tech Architecture",
      "M.Tech VLSI",
      "MBA",
      "LL.B",
    ],
    overview:
      "As the oldest IIT, IIT Kharagpur combines heritage with massive campus infrastructure and diverse programs. It is especially respected for core engineering, law, and management offerings under one roof.",
  },
  {
    name: "IIT Kanpur",
    location: "Kalyanpur, Kanpur",
    city: "Kanpur",
    state: "Uttar Pradesh",
    fees: 200000,
    rating: 4.7,
    avgPackage: 1800000,
    established: 1959,
    type: "Public/Govt",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Materials Science",
      "B.Tech Civil Engineering",
      "M.Tech Nuclear Engineering",
      "MBA",
      "Ph.D Physics",
    ],
    overview:
      "IIT Kanpur is celebrated for rigorous academics and pioneering research in science and engineering. The campus fosters deep theoretical learning alongside strong placement outcomes in tech and consulting.",
  },
  {
    name: "NIT Trichy",
    location: "Tanjore Main Road, Tiruchirappalli",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    fees: 180000,
    rating: 4.5,
    avgPackage: 1600000,
    established: 1964,
    type: "Public/Govt",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Electronics & Communication",
      "B.Tech Mechanical Engineering",
      "M.Tech Structural Engineering",
      "MBA",
      "M.Sc Chemistry",
    ],
    overview:
      "NIT Trichy is widely regarded as the leading NIT with excellent faculty and campus life. Its graduates are highly sought after by product companies, core engineering firms, and global IT majors.",
  },
  {
    name: "NIT Surathkal",
    location: "Srinivasnagar, Surathkal",
    city: "Surathkal",
    state: "Karnataka",
    fees: 160000,
    rating: 4.4,
    avgPackage: 1400000,
    established: 1960,
    type: "Public/Govt",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Information Technology",
      "B.Tech Chemical Engineering",
      "M.Tech Thermal Engineering",
      "MBA",
      "MCA",
    ],
    overview:
      "NIT Surathkal enjoys a scenic coastal campus and strong programs in IT and core engineering. The institute maintains robust industry ties across Bangalore and Mangalore tech corridors.",
  },
  {
    name: "NIT Warangal",
    location: "Hanamkonda, Warangal",
    city: "Warangal",
    state: "Telangana",
    fees: 150000,
    rating: 4.3,
    avgPackage: 1200000,
    established: 1959,
    type: "Public/Govt",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Metallurgical Engineering",
      "B.Tech Biotechnology",
      "M.Tech Power Systems",
      "MBA",
      "M.Sc Mathematics",
    ],
    overview:
      "NIT Warangal has a legacy of excellence in engineering education across Telangana and Andhra regions. Students access well-equipped labs and consistent placement support from national recruiters.",
  },
  {
    name: "NIT Calicut",
    location: "Kattangal, Kozhikode",
    city: "Kozhikode",
    state: "Kerala",
    fees: 170000,
    rating: 4.2,
    avgPackage: 1000000,
    established: 1961,
    type: "Public/Govt",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Electronics & Communication",
      "B.Tech Production Engineering",
      "M.Tech Communication Systems",
      "MBA",
      "MCA",
    ],
    overview:
      "NIT Calicut serves as a premier technical hub in Kerala with growing research output. The campus culture blends academic rigor with active student clubs and hackathon participation.",
  },
  {
    name: "BITS Pilani",
    location: "Vidya Vihar, Pilani",
    city: "Pilani",
    state: "Rajasthan",
    fees: 250000,
    rating: 4.5,
    avgPackage: 1500000,
    established: 1964,
    type: "Private",
    courses: [
      "B.E. Computer Science",
      "B.E. Electronics & Instrumentation",
      "B.Pharm",
      "M.E. Software Systems",
      "MBA",
      "M.Sc Biological Sciences",
    ],
    overview:
      "BITS Pilani operates on a flexible academic system with strong emphasis on innovation and entrepreneurship. Its alumni network spans global tech leadership roles and high-growth startups.",
  },
  {
    name: "VIT Vellore",
    location: "Katpadi, Vellore",
    city: "Vellore",
    state: "Tamil Nadu",
    fees: 450000,
    rating: 4.3,
    avgPackage: 1400000,
    established: 1984,
    type: "Private",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Electronics & Communication",
      "B.Tech Biotechnology",
      "M.Tech Cyber Security",
      "MBA",
      "B.Des",
    ],
    overview:
      "VIT Vellore is one of India's largest private universities with a fully flexible credit system. It attracts thousands of recruiters annually and offers extensive international exchange opportunities.",
  },
  {
    name: "Manipal Institute of Technology",
    location: "Manipal, Udupi",
    city: "Manipal",
    state: "Karnataka",
    fees: 380000,
    rating: 4.1,
    avgPackage: 1100000,
    established: 1957,
    type: "Private",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Aeronautical Engineering",
      "B.Tech Biomedical Engineering",
      "M.Tech Automotive Engineering",
      "MBA",
      "MCA",
    ],
    overview:
      "MIT Manipal delivers a cosmopolitan campus experience with modern infrastructure and hospital proximity for biomedical programs. Graduates excel in IT services, healthcare tech, and core engineering roles.",
  },
  {
    name: "SRM Institute of Science and Technology",
    location: "Kattankulathur, Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    fees: 320000,
    rating: 4.0,
    avgPackage: 900000,
    established: 1985,
    type: "Private",
    courses: [
      "B.Tech Computer Science",
      "B.Tech AI & Data Science",
      "B.Tech Civil Engineering",
      "M.Tech Cloud Computing",
      "MBA",
      "B.Arch",
    ],
    overview:
      "SRM Chennai offers scale, diverse specializations, and strong industry immersion through internships. The university invests heavily in innovation labs and interdisciplinary research centers.",
  },
  {
    name: "Amity University Noida",
    location: "Sector 125, Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    fees: 550000,
    rating: 3.9,
    avgPackage: 800000,
    established: 2005,
    type: "Private",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Electronics & Communication",
      "B.Tech Aerospace Engineering",
      "MBA",
      "LL.B",
      "BBA",
    ],
    overview:
      "Amity Noida provides premium campus facilities and global partnerships across programs. Students access corporate mentorship, incubation support, and wide placement drives each semester.",
  },
  {
    name: "Thapar Institute of Engineering and Technology",
    location: "Bhadaur, Patiala",
    city: "Patiala",
    state: "Punjab",
    fees: 400000,
    rating: 4.2,
    avgPackage: 1200000,
    established: 1956,
    type: "Private",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Chemical Engineering",
      "B.Tech Mechanical Engineering",
      "M.Tech Environmental Engineering",
      "MBA",
      "Ph.D Engineering",
    ],
    overview:
      "Thapar Patiala is a heritage private institute with consistently strong academics in Punjab. Its graduates are valued in manufacturing, software, and consulting with solid research opportunities.",
  },
  {
    name: "PES University",
    location: "Ring Road, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    fees: 800000,
    rating: 4.0,
    avgPackage: 700000,
    established: 1972,
    type: "Private",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Electronics & Communication",
      "B.Tech Biotechnology",
      "MBA",
      "BBA",
      "MCA",
    ],
    overview:
      "PES Bangalore leverages its location in India's tech capital for internships and startup exposure. The university emphasizes project-based learning and industry-aligned curriculum updates.",
  },
  {
    name: "IIM Ahmedabad",
    location: "Vastrapur, Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    fees: 2500000,
    rating: 4.9,
    avgPackage: 3500000,
    established: 1961,
    type: "Public/Govt",
    courses: [
      "MBA",
      "MBA-PGPX",
      "Ph.D Management",
      "Executive MBA",
      "Fellow Programme in Management",
      "ePGD",
    ],
    overview:
      "IIM Ahmedabad is India's most prestigious business school, producing leaders across consulting, finance, and industry. Its case-based pedagogy and alumni network are considered the gold standard in Indian management education.",
  },
  {
    name: "IIM Bangalore",
    location: "Bannerghatta Road, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    fees: 2400000,
    rating: 4.9,
    avgPackage: 3300000,
    established: 1973,
    type: "Public/Govt",
    courses: [
      "MBA",
      "MBA Business Analytics",
      "Ph.D Management",
      "Executive MBA",
      "NSR Pre-doc",
      "Certificate Programmes",
    ],
    overview:
      "IIM Bangalore sits at the heart of India's startup and technology ecosystem, attracting top recruiters. The institute is known for finance, strategy, and product management talent pipelines.",
  },
  {
    name: "XLRI Jamshedpur",
    location: "Circuit House Area East, Jamshedpur",
    city: "Jamshedpur",
    state: "Jharkhand",
    fees: 2300000,
    rating: 4.8,
    avgPackage: 2800000,
    established: 1949,
    type: "Private",
    courses: [
      "MBA-HRM",
      "MBA-BM",
      "Executive MBA",
      "Ph.D Management",
      "GMP",
      "Virtual Interactive Learning",
    ],
    overview:
      "XLRI is India's oldest B-school, renowned for human resources and business management excellence. Its values-driven culture and ethics-focused curriculum distinguish graduates in leadership roles.",
  },
  {
    name: "MDI Gurgaon",
    location: "Mehrauli Road, Gurgaon",
    city: "Gurgaon",
    state: "Haryana",
    fees: 2100000,
    rating: 4.7,
    avgPackage: 2600000,
    established: 1973,
    type: "Private",
    courses: [
      "PGPM",
      "PGPM-HRM",
      "Executive PGPM",
      "FPM",
      "National Management Programme",
      "Part-Time PGPM",
    ],
    overview:
      "MDI Gurgaon combines corporate proximity with rigorous general management training. Students benefit from strong consulting and FMCG placements plus active corporate guest lecture series.",
  },
  {
    name: "SP Jain Institute of Management and Research",
    location: "Andheri West, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    fees: 2000000,
    rating: 4.6,
    avgPackage: 2400000,
    established: 1981,
    type: "Private",
    courses: [
      "PGDM",
      "PGDM Marketing",
      "PGDM Finance",
      "Executive MBA",
      "FPM",
      "Global MBA",
    ],
    overview:
      "SPJIMR Mumbai emphasizes values-based leadership and sectoral specialization tracks. The institute maintains excellent ties with financial services, consulting, and family business networks.",
  },
  {
    name: "Faculty of Management Studies, Delhi",
    location: "University of Delhi, Delhi",
    city: "Delhi",
    state: "Delhi",
    fees: 1000000,
    rating: 4.5,
    avgPackage: 2000000,
    established: 1954,
    type: "Public/Govt",
    courses: [
      "MBA Full-Time",
      "MBA Executive",
      "MBA Executive HCA",
      "Management Development Programmes",
      "Doctoral Programme",
      "MOOCs",
    ],
    overview:
      "FMS Delhi offers exceptional ROI with University of Delhi affiliation and top-tier placements. The program is known for finance, consulting, and general management roles at competitive fee levels.",
  },
  {
    name: "Christ University",
    location: "Hosur Road, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    fees: 250000,
    rating: 4.0,
    avgPackage: 800000,
    established: 1969,
    type: "Private",
    courses: [
      "BBA",
      "B.Com",
      "BA Psychology",
      "MBA",
      "LL.B",
      "B.Tech Computer Science",
    ],
    overview:
      "Christ University Bangalore is a leading private university known for holistic education and discipline. It offers strong programs across commerce, law, humanities, and emerging professional courses.",
  },
  {
    name: "Symbiosis International University",
    location: "Senapati Bapat Road, Pune",
    city: "Pune",
    state: "Maharashtra",
    fees: 350000,
    rating: 4.1,
    avgPackage: 750000,
    established: 1971,
    type: "Private",
    courses: [
      "BBA",
      "B.Tech Computer Science",
      "BA Mass Communication",
      "MBA",
      "LL.B",
      "B.Des",
    ],
    overview:
      "Symbiosis Pune provides a vibrant multicultural campus with international student exchange. The institution excels in management, media, law, and liberal arts with industry-integrated learning.",
  },
  {
    name: "Lovely Professional University",
    location: "Jalandhar-Delhi G.T. Road, Phagwara",
    city: "Phagwara",
    state: "Punjab",
    fees: 180000,
    rating: 3.5,
    avgPackage: 500000,
    established: 2005,
    type: "Private",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Mechanical Engineering",
      "BBA",
      "MBA",
      "B.Com",
      "Hotel Management",
    ],
    overview:
      "LPU is one of India's largest private universities by enrollment with extensive program variety. The campus features modern amenities, sports infrastructure, and mass recruitment drives.",
  },
  {
    name: "Chitkara University",
    location: "Rajpura-Chandigarh Highway, Rajpura",
    city: "Rajpura",
    state: "Punjab",
    fees: 220000,
    rating: 3.8,
    avgPackage: 600000,
    established: 2010,
    type: "Private",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Electronics & Communication",
      "BBA",
      "MBA",
      "B.Pharm",
      "B.Arch",
    ],
    overview:
      "Chitkara University Punjab focuses on employability with strong industry projects and skill labs. Students gain practical exposure through incubation centers and corporate partnership programs.",
  },
  {
    name: "KIIT University",
    location: "Patia, Bhubaneswar",
    city: "Bhubaneswar",
    state: "Odisha",
    fees: 300000,
    rating: 3.9,
    avgPackage: 650000,
    established: 1992,
    type: "Private",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Electrical Engineering",
      "BBA",
      "MBA",
      "MBBS",
      "LL.B",
    ],
    overview:
      "KIIT Bhubaneswar has grown into a multidisciplinary university spanning engineering, law, and medicine. Its green campus and expanding research footprint attract students from across eastern India.",
  },
  {
    name: "UPES",
    location: "Bidholi, Dehradun",
    city: "Dehradun",
    state: "Uttarakhand",
    fees: 400000,
    rating: 3.2,
    avgPackage: 400000,
    established: 2003,
    type: "Private",
    courses: [
      "B.Tech Computer Science",
      "B.Tech Petroleum Engineering",
      "BBA Oil & Gas",
      "MBA Energy Management",
      "LL.B Energy Law",
      "B.Des",
    ],
    overview:
      "UPES Dehradun is India's first energy and core sector-focused university with niche industry alignments. Programs blend domain specialization in oil, gas, power, and infrastructure with management skills.",
  },
];

async function main(): Promise<void> {
  await prisma.savedCollege.deleteMany();
  await prisma.college.deleteMany();

  await prisma.$transaction(
    colleges.map((college, index) =>
      prisma.college.create({
        data: {
          ...college,
          image: IMAGES[index % IMAGES.length],
        },
      })
    )
  );

  console.log(`Seeded ${colleges.length} colleges successfully.`);
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
