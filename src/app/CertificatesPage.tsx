import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Award, ExternalLink, ArrowLeft, X } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

type Cert = {
  id: number;
  title: string;
  issuer: string;
  year: string;
  category: string;
  url: string | null;
  verifyCode?: string;
  image?: string | null;
};

const CATEGORIES = ["All", "Specializations", "AI & Data", "Marketing", "Python & Dev", "Business & Finance", "Other"] as const;

const CERTIFICATES: Cert[] = [
  // SPECIALIZATIONS
  { id: 8,  title: "Python for Everybody Specialization", issuer: "Univ. of Michigan / Coursera", year: "Mar 2025", category: "Specializations", url: "https://coursera.org/verify/specialization/D4LG2BZMQQW1" , image: "/certs/Coursera D4LG2BZMQQW1.jpg"},
  { id: 29, title: "Intuit Academy Bookkeeping Specialization", issuer: "Intuit / Coursera", year: "Jun 2025", category: "Specializations", url: "https://coursera.org/verify/specialization/9HURB96FLV6S" , image: "/certs/Coursera 9HURB96FLV6S.jpg"},
  { id: 39, title: "Google AI Essentials Specialization", issuer: "Google / Coursera", year: "Nov 2025", category: "Specializations", url: "https://coursera.org/verify/specialization/RXNQ1HJK7URW" , image: "/certs/Coursera RXNQ1HJK7URW.jpg"},
  { id: 45, title: "Google Prompting Essentials Specialization", issuer: "Google / Coursera", year: "Jan 2026", category: "Specializations", url: "https://coursera.org/verify/specialization/4IXLR5OBX1TU" , image: "/certs/Coursera 4IXLR5OBX1TU.jpg"},
  { id: 53, title: "Google Digital Marketing & E-commerce Specialization", issuer: "Google / Coursera", year: "Jan 2026", category: "Specializations", url: "https://coursera.org/verify/specialization/A3WC44SLAHOQ" , image: "/certs/Coursera A3WC44SLAHOQ.jpg"},
  { id: 60, title: "McKinsey Forward Program", issuer: "McKinsey / Credly", year: "Jun 2026", category: "Specializations", url: "https://www.credly.com/badges/38354f21-6d7d-4119-9163-2d739f00d75e" , image: "/certs/Forward20260629-32-qtn9d6.jpg"},

  // AI & DATA
  { id: 2,  title: "AI For Everyone", issuer: "DeepLearning.AI / Coursera", year: "Jan 2025", category: "AI & Data", url: "https://coursera.org/verify/EWNBBYUCCP9I" , image: "/certs/Coursera EWNBBYUCCP9I.jpg"},
  { id: 12, title: "Data Analysis and Visualization with Python", issuer: "Microsoft / Coursera", year: "Apr 2025", category: "AI & Data", url: "https://coursera.org/verify/UUV2MQOCPXZ8" , image: "/certs/Coursera UUV2MQOCPXZ8.jpg"},
  { id: 30, title: "Deep Learning for Business", issuer: "Yonsei University / Coursera", year: "Jun 2025", category: "AI & Data", url: "https://coursera.org/verify/R7Z3J0H0GK0U" , image: "/certs/Coursera R7Z3J0H0GK0U.jpg"},
  { id: 32, title: "From Excel to Power BI", issuer: "Knowledge Accelerators / Coursera", year: "Aug 2025", category: "AI & Data", url: "https://coursera.org/verify/67KCYIM7B4E0" , image: "/certs/Coursera 67KCYIM7B4E0.jpg"},
  { id: 35, title: "Introduction to AI", issuer: "Google / Coursera", year: "Nov 2025", category: "AI & Data", url: "https://coursera.org/verify/OQ1C96T7T562" , image: "/certs/Coursera OQ1C96T7T562.jpg"},
  { id: 36, title: "Maximize Productivity with AI Tools", issuer: "Google / Coursera", year: "Nov 2025", category: "AI & Data", url: "https://coursera.org/verify/0CRL6KR0X5XN" , image: "/certs/Coursera 0CRL6KR0X5XN.jpg"},
  { id: 37, title: "Use AI Responsibly", issuer: "Google / Coursera", year: "Nov 2025", category: "AI & Data", url: "https://coursera.org/verify/S1QFBKXTKQCF" , image: "/certs/Coursera S1QFBKXTKQCF.jpg"},
  { id: 38, title: "Discover the Art of Prompting", issuer: "Google / Coursera", year: "Nov 2025", category: "AI & Data", url: "https://coursera.org/verify/IQQSCD2ZQJC0" , image: "/certs/Coursera IQQSCD2ZQJC0.jpg"},
  { id: 40, title: "Stay Ahead of the AI Curve", issuer: "Google / Coursera", year: "Nov 2025", category: "AI & Data", url: "https://coursera.org/verify/E5KJZ323ZGGU" , image: "/certs/Coursera E5KJZ323ZGGU.jpg"},
  { id: 44, title: "Start Writing Prompts like a Pro", issuer: "Google / Coursera", year: "Jan 2026", category: "AI & Data", url: "https://coursera.org/verify/A3VIO585N2C3" , image: "/certs/Coursera A3VIO585N2C3.jpg"},
  { id: 46, title: "Use AI as a Creative or Expert Partner", issuer: "Google / Coursera", year: "Jan 2026", category: "AI & Data", url: "https://coursera.org/verify/EEDN3VX36HFY" , image: "/certs/Coursera EEDN3VX36HFY.jpg"},
  { id: 47, title: "Speed Up Data Analysis and Presentation Building", issuer: "Google / Coursera", year: "Jan 2026", category: "AI & Data", url: "https://coursera.org/verify/DRIZUFKNC6GA" , image: "/certs/Coursera DRIZUFKNC6GA.jpg"},
  { id: 48, title: "Design Prompts for Everyday Work Tasks", issuer: "Google / Coursera", year: "Jan 2026", category: "AI & Data", url: "https://coursera.org/verify/N4R7JA8SWEWQ" , image: "/certs/Coursera N4R7JA8SWEWQ.jpg"},
  { id: 56, title: "Work Smarter with AI", issuer: "Canva Design School", year: "Feb 2026", category: "AI & Data", url: "https://www.canva.com/design-school/certification-award/40cc1bec-3282-4f87-a0af-7f99a37a337d" , image: "/certs/muhammad-kamal-work-smarter-with-ai-certificate.jpg"},
  { id: 59, title: "HEC Generative AI Application Developer Certificate", issuer: "HEC / IdeaGist / iCodeGuru", year: "Jun 2026", category: "AI & Data", url: "https://quiz.ideagist.com/ideagist-certificate/?cert_hash=68018aeeba233818" , image: "/certs/certificate-1780218503325.jpg"},
  { id: 61, title: "Foundations of Data Science", issuer: "Google / Coursera", year: "Jul 2026", category: "AI & Data", url: "https://coursera.org/verify/1AMWDQ23TFIW" , image: "/certs/Coursera 1AMWDQ23TFIW.jpg"},
  { id: 63, title: "Data Analytics and Business Intelligence", issuer: "DigiSkills", year: "Jul 2026", category: "AI & Data", url: "https://digiskills.pk/verify/", verifyCode: "4D3YCVQMK" , image: "/certs/DSTP_Certificate_ 4D3YCVQMK.jpg"},
  { id: 65, title: "Go Beyond the Numbers: Translate Data into Insights", issuer: "Google / Coursera", year: "Aug 2026", category: "AI & Data", url: "https://coursera.org/verify/26D0IAN4BIFJ" , image: "/certs/Coursera 26D0IAN4BIFJ.jpg"},
  { id: 66, title: "Cloud Technical Series", issuer: "Google Cloud / Credly", year: "Aug 2026", category: "AI & Data", url: "https://www.credly.com/badges/7f389389-951a-4846-b637-922a1ab98026/" , image: "/certs/cloud-technical-series.png"},
  { id: 67, title: "The Power of Statistics", issuer: "Google / Coursera", year: "Aug 2026", category: "AI & Data", url: "https://coursera.org/verify/203ZUWST5NPT" , image: "/certs/Coursera 203ZUWST5NPT.jpg"},
  { id: 69, title: "Regression Analysis: Simplify Complex Data Relationships", issuer: "Google / Coursera", year: "Sep 2026", category: "AI & Data", url: "https://coursera.org/verify/Z8ZFC6YXGX92" , image: "/certs/Coursera Z8ZFC6YXGX92.jpg"},

  // MARKETING
  { id: 42, title: "From Likes to Leads: Interact with Customers Online", issuer: "Google / Coursera", year: "Jan 2026", category: "Marketing", url: "https://coursera.org/verify/SD2JQHOYOKNW" , image: "/certs/Coursera SD2JQHOYOKNW.jpg"},
  { id: 43, title: "Foundations of Digital Marketing and E-commerce", issuer: "Google / Coursera", year: "Jan 2026", category: "Marketing", url: "https://coursera.org/verify/N2D4FM5HJGGM" , image: "/certs/Coursera N2D4FM5HJGGM.jpg"},
  { id: 49, title: "Attract and Engage Customers with Digital Marketing", issuer: "Google / Coursera", year: "Jan 2026", category: "Marketing", url: "https://coursera.org/verify/8LBNO7INGHXE" , image: "/certs/Coursera 8LBNO7INGHXE.jpg"},
  { id: 50, title: "Think Outside the Inbox: Email Marketing", issuer: "Google / Coursera", year: "Jan 2026", category: "Marketing", url: "https://coursera.org/verify/MP1FJJ8AV7DT" , image: "/certs/Coursera MP1FJJ8AV7DT.jpg"},
  { id: 51, title: "Assess for Success: Marketing Analytics and Measurement", issuer: "Google / Coursera", year: "Jan 2026", category: "Marketing", url: "https://coursera.org/verify/6VPW32V2H4JH" , image: "/certs/Coursera 6VPW32V2H4JH.jpg"},
  { id: 52, title: "Make the Sale: Build, Launch, and Manage E-commerce Stores", issuer: "Google / Coursera", year: "Jan 2026", category: "Marketing", url: "https://coursera.org/verify/P6PPIM1OPJO8" , image: "/certs/Coursera P6PPIM1OPJO8.jpg"},
  { id: 54, title: "Accelerate Your Job Search with AI", issuer: "Google / Coursera", year: "Jan 2026", category: "Marketing", url: "https://coursera.org/verify/AONGLEPEM2IW" , image: "/certs/Coursera AONGLEPEM2IW.jpg"},
  { id: 55, title: "Satisfaction Guaranteed: Develop Customer Loyalty Online", issuer: "Google / Coursera", year: "Jan 2026", category: "Marketing", url: "https://coursera.org/verify/W1MT511WBZFX" , image: "/certs/Coursera W1MT511WBZFX.jpg"},
  { id: 62, title: "Writing with Impact", issuer: "LinkedIn Learning", year: "Jul 2026", category: "Marketing", url: "https://www.linkedin.com/learning/certificates/97f163b9d45b9280c0921892d2e83700155fbe63b8a560bd784d810de6ee1548" , image: "/certs/CertificateOfCompletion_Writing with Impact.jpg"},

  // PYTHON & DEV
  { id: 3,  title: "Programming for Everybody (Getting Started with Python)", issuer: "Univ. of Michigan / Coursera", year: "Jan 2025", category: "Python & Dev", url: "https://coursera.org/verify/LAWEY10XG3GG" , image: "/certs/Coursera LAWEY10XG3GG.jpg"},
  { id: 4,  title: "Python Data Structures", issuer: "Univ. of Michigan / Coursera", year: "Feb 2025", category: "Python & Dev", url: "https://coursera.org/verify/5LX5JMBCZEKJ" , image: "/certs/Coursera 5LX5JMBCZEKJ.jpg"},
  { id: 5,  title: "Using Python to Access Web Data", issuer: "Univ. of Michigan / Coursera", year: "Feb 2025", category: "Python & Dev", url: "https://coursera.org/verify/P2KGR216DCU8" , image: "/certs/Coursera P2KGR216DCU8.jpg"},
  { id: 6,  title: "Using Databases with Python", issuer: "Univ. of Michigan / Coursera", year: "Mar 2025", category: "Python & Dev", url: "https://coursera.org/verify/HSO86HYNKG6I" , image: "/certs/Coursera HSO86HYNKG6I.jpg"},
  { id: 7,  title: "Capstone: Retrieving, Processing, and Visualizing Data with Python", issuer: "Univ. of Michigan / Coursera", year: "Mar 2025", category: "Python & Dev", url: "https://coursera.org/verify/WYI5G3PO75KK" , image: "/certs/Coursera WYI5G3PO75KK.jpg"},
  { id: 9,  title: "Advanced MySQL Topics", issuer: "Meta / Coursera", year: "Mar 2025", category: "Python & Dev", url: "https://coursera.org/verify/HR6TFA5FM6EF" , image: "/certs/Coursera HR6TFA5FM6EF.jpg"},
  { id: 10, title: "Python Programming Fundamentals", issuer: "Microsoft / Coursera", year: "Apr 2025", category: "Python & Dev", url: "https://coursera.org/verify/HT233OD2JGAV" , image: "/certs/Coursera HT233OD2JGAV.jpg"},
  { id: 11, title: "Introduction to Databases", issuer: "Meta / Coursera", year: "Apr 2025", category: "Python & Dev", url: "https://coursera.org/verify/BC0D0L18N5D6" , image: "/certs/Coursera BC0D0L18N5D6.jpg"},
  { id: 14, title: "Version Control", issuer: "Meta / Coursera", year: "May 2025", category: "Python & Dev", url: "https://coursera.org/verify/EFEFE1POJYGG" , image: "/certs/Coursera EFEFE1POJYGG.jpg"},
  { id: 17, title: "Database Structures and Management with MySQL", issuer: "Meta / Coursera", year: "Jun 2025", category: "Python & Dev", url: "https://coursera.org/verify/SWBAVQOU4JI1" , image: "/certs/Coursera SWBAVQOU4JI1.jpg"},
  { id: 64, title: "WordPress", issuer: "DigiSkills", year: "Jul 2026", category: "Python & Dev", url: "https://digiskills.pk/verify/", verifyCode: "ZJMKD2KMK" , image: "/certs/DSTP_Certificate_ ZJMKD2KMK.jpg"},

  // BUSINESS & FINANCE
  { id: 1,  title: "Freelancing", issuer: "DigiSkills", year: "Feb 2024", category: "Business & Finance", url: "https://digiskills.pk/verify/", verifyCode: "82AGYEXMK" , image: "/certs/DSTP_Certificate_ 82AGYEXMK.jpg"},
  { id: 13, title: "Bookkeeping Basics", issuer: "Intuit / Coursera", year: "May 2025", category: "Business & Finance", url: "https://coursera.org/verify/74IXPHAUYVXS" , image: "/certs/Coursera 74IXPHAUYVXS.jpg"},
  { id: 16, title: "Assets in Accounting", issuer: "Intuit / Coursera", year: "Jun 2025", category: "Business & Finance", url: "https://coursera.org/verify/BCTSF39KA008" , image: "/certs/Coursera BCTSF39KA008.jpg"},
  { id: 18, title: "Work Smarter with Microsoft Excel", issuer: "Microsoft / Coursera", year: "Jun 2025", category: "Business & Finance", url: "https://coursera.org/verify/HXGJXJ6B9E8B" , image: "/certs/Coursera HXGJXJ6B9E8B.jpg"},
  { id: 20, title: "Getting Started with Microsoft Excel", issuer: "Coursera", year: "Jun 2025", category: "Business & Finance", url: "https://coursera.org/verify/YDC442O5Y3P2" , image: "/certs/Coursera YDC442O5Y3P2.jpg"},
  { id: 22, title: "Using Basic Formulas and Functions in Microsoft Excel", issuer: "Coursera", year: "Jun 2025", category: "Business & Finance", url: "https://coursera.org/verify/6EPK6PCB6PUV" , image: "/certs/Coursera 6EPK6PCB6PUV.jpg"},
  { id: 23, title: "Introduction to Project Management", issuer: "Coursera", year: "Jun 2025", category: "Business & Finance", url: "https://coursera.org/verify/WVBELOA8RFXY" , image: "/certs/Coursera WVBELOA8RFXY.jpg"},
  { id: 24, title: "Create a Project Management Tracker using Microsoft Excel", issuer: "Coursera", year: "Jun 2025", category: "Business & Finance", url: "https://coursera.org/verify/25VY8QWLTXMF" , image: "/certs/Coursera 25VY8QWLTXMF.jpg"},
  { id: 25, title: "Create a Financial Statement using Microsoft Excel", issuer: "Coursera", year: "Jun 2025", category: "Business & Finance", url: "https://coursera.org/verify/SKG2IK45P0FF" , image: "/certs/Coursera SKG2IK45P0FF.jpg"},
  { id: 26, title: "Liabilities and Equity in Accounting", issuer: "Intuit / Coursera", year: "Jun 2025", category: "Business & Finance", url: "https://coursera.org/verify/JKUNIMDX3EZ1" , image: "/certs/Coursera JKUNIMDX3EZ1.jpg"},
  { id: 28, title: "Financial Statement Analysis", issuer: "Intuit / Coursera", year: "Jun 2025", category: "Business & Finance", url: "https://coursera.org/verify/B2EQ0KSPDGVA" , image: "/certs/Coursera B2EQ0KSPDGVA.jpg"},
  { id: 33, title: "Business Communication and AI for Professionals", issuer: "ILMx LUMS", year: "Nov 2025", category: "Business & Finance", url: "https://ilmx.org/certificates/0be6d10fcc0c4dfe9c8aa73aab170f8a" , image: "/certs/0be6d10fcc0c4dfe9c8aa73aab170f8a.png"},
  { id: 34, title: "How to Finance and Grow Your Startup — Without VC", issuer: "Univ. of London / Coursera", year: "Nov 2025", category: "Business & Finance", url: "https://coursera.org/verify/YRDJNN938HEW" , image: "/certs/Coursera YRDJNN938HEW.jpg"},
  { id: 41, title: "Microeconomics: The Power of Markets", issuer: "Univ. of Pennsylvania / Coursera", year: "Dec 2025", category: "Business & Finance", url: "https://coursera.org/verify/OGQEOQ6IS3NE" , image: "/certs/Coursera OGQEOQ6IS3NE.jpg"},
  { id: 58, title: "PNC — Financial Services and Banking Job Simulation", issuer: "PNC / Forage", year: "Apr 2026", category: "Business & Finance", url: "https://www.theforage.com/completion-certificates/3W4C6QjJzfhEmi4Ay/KfhEd8StnWdjsTGsw_3W4C6QjJzfhEmi4Ay_69e25d7236ebdcf046c11531_1777396876712_completion_certificate.pdf" , image: "/certs/KfhEd8StnWdjsTGsw_3W4C6QjJzfhEmi4Ay_69e25d7236ebdcf046c11531_1777396876712_completion_certificate.jpg"},

  // OTHER
  { id: 15, title: "Chinese for HSK 1", issuer: "Peking University / Coursera", year: "May 2025", category: "Other", url: "https://coursera.org/verify/PQ4ZUZI4071L" , image: "/certs/Coursera PQ4ZUZI4071L.jpg"},
  { id: 19, title: "The World of Classroom Assessment and Testing", issuer: "HEC Pakistan / Coursera", year: "Jun 2025", category: "Other", url: "https://coursera.org/verify/H0RQEJUPPEP4" , image: "/certs/Coursera H0RQEJUPPEP4.jpg"},
  { id: 21, title: "How to Write a Research Paper", issuer: "HEC Pakistan / Coursera", year: "Jun 2025", category: "Other", url: "https://coursera.org/verify/AVSUBH832W7R" , image: "/certs/Coursera AVSUBH832W7R.jpg"},
  { id: 27, title: "Statistical Analysis of Data for Researchers", issuer: "HEC Pakistan / Coursera", year: "Jun 2025", category: "Other", url: "https://coursera.org/verify/XO4RK1UPAHKU" , image: "/certs/Coursera XO4RK1UPAHKU.jpg"},
  { id: 31, title: "Introduction to Psychology", issuer: "Yale University / Coursera", year: "Aug 2025", category: "Other", url: "https://coursera.org/verify/8DG0F2RR7MK7" , image: "/certs/Coursera 8DG0F2RR7MK7.jpg"},
  { id: 57, title: "Aspire Leadership Program", issuer: "Aspire Institute", year: "Apr 2026", category: "Other", url: null , image: "/certs/Aspire-Certificate.jpg"},
  { id: 68, title: "IELTS Writing Section Skills Mastery", issuer: "UC Irvine / Coursera", year: "Sep 2026", category: "Other", url: "https://coursera.org/verify/S7VS5HKKPAKL" , image: "/certs/Coursera S7VS5HKKPAKL.jpg"},
  { id: 70, title: "GMI Career Readiness Mentorship Program", issuer: "Global Mentorship Initiative", year: "Oct 2026", category: "Other", url: "https://credentials.globalmentorship.org/credentials/5b355565-8bac-4181-99c0-802b17f0b30c?preview=1" , image: "/certs/5b355565-8bac-4181-99c0-802b17f0b30c.png"},
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

function CertCard({ cert, index, onImageClick }: { cert: Cert; index: number; onImageClick: (url: string) => void }) {
  const isSpecialization = cert.category === "Specializations";
  const [imgFailed, setImgFailed] = useState(false);

  const showImage = cert.image && !imgFailed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.4), ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`bg-card border rounded-xl p-5 flex flex-col gap-3 hover:border-primary/40 transition-all ${
        isSpecialization ? "border-primary/30" : "border-border"
      }`}
    >
      {/* Image slot */}
      {showImage ? (
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden relative group bg-black/5">
          <div className="block w-full h-full relative">
            <img
              src={`/certs/thumbs/${cert.image!.split('/').pop()?.replace(/\.[^/.]+$/, "")}-1440w.webp`}
              width={720}
              height={540}
              loading="lazy"
              decoding="async"
              alt={cert.title}
              className="w-full h-auto object-contain transition-opacity duration-500"
              style={{ imageRendering: "-webkit-optimize-contrast" }}
              onError={() => setImgFailed(true)}
            />
            <button
              onClick={() => onImageClick(cert.image!)}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 backdrop-blur-sm cursor-pointer"
              title="View Certificate"
            >
              <ExternalLink size={14} />
              <span className="text-xs font-medium pr-1">View</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={`w-full aspect-[4/3] rounded-lg flex items-center justify-center ${
          isSpecialization
            ? "bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
            : "bg-secondary/60"
        }`}>
          <Award
            size={32}
            className={`${isSpecialization ? "text-primary opacity-50" : "text-muted-foreground opacity-25"}`}
          />
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-start gap-2 flex-wrap mb-1">
          <p className="text-foreground font-semibold text-sm leading-snug flex-1">{cert.title}</p>
          {isSpecialization && <Award size={13} className="text-primary flex-none mt-0.5" />}
        </div>
        <p className="text-muted-foreground text-xs">{cert.issuer}</p>
        {cert.verifyCode && (
          <p className="text-xs text-muted-foreground/70 mt-1.5 font-mono">
            Code: {cert.verifyCode}
          </p>
        )}
      </div>

      {/* Bottom row: date left, verify right */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-xs font-semibold text-primary">{cert.year}</span>
        {cert.url ? (
          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Verify <ExternalLink size={11} />
          </a>
        ) : (
          <span className="text-xs text-muted-foreground/40">No link</span>
        )}
      </div>
    </motion.div>
  );
}

export default function CertificatesPage() {
  const [active, setActive] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filtered =
    active === "All" ? CERTIFICATES : CERTIFICATES.filter((c) => c.category === active);

  const counts = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === "All" ? CERTIFICATES.length : CERTIFICATES.filter((c) => c.category === cat).length;
    return acc;
  }, {});

  return (
    <main className="pt-20 md:pt-24 pb-16 md:pb-28 px-8 sm:px-12 min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>

          <div className="flex items-center gap-2 md:gap-3 mb-3">
            {/* <span className="h-px w-4 md:w-8 bg-primary block" /> */}
            <span className="text-primary text-[10px] md:text-xs font-semibold tracking-[0.06em] md:tracking-[0.18em] uppercase">
              All Credentials
            </span>
          </div>
          <h1
            className="text-[clamp(1.9rem,7vw,5.5rem)] font-black uppercase leading-[0.95] text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Certificates
          </h1>
          <p className="text-muted-foreground max-w-lg">
            {CERTIFICATES.length}+ verified credentials across data analytics, AI, marketing,
            Python, and business — all verifiable via the links below.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-none flex items-center gap-1 md:gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
              <span
                className={`text-xs rounded-full px-1.5 py-0.5 ${
                  active === cat ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
                }`}
              >
                {counts[cat]}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((cert, i) => (
            <CertCard key={`${active}-${cert.id}`} cert={cert} index={i} onImageClick={setSelectedImage} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted-foreground text-center py-20">No certificates in this category.</p>
        )}
      </div>

      {/* Full-size Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-background/90 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-secondary/80 hover:bg-secondary text-foreground p-2 rounded-full transition-colors z-[51]"
          >
            <X size={24} />
          </button>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full size certificate"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      )}
    </main>
  );
}
