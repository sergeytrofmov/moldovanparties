"use client"

import { useState, createContext, useContext } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, Globe, Facebook, Instagram, Youtube } from "lucide-react" // removed ChevronUp and X
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion" // removed AnimatePresence since it's not used

const XLogo = ({ className = "", size = 24 }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    className={className}
    aria-hidden="true"
  >
    <path 
      fill="currentColor" 
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
    />
  </svg>
);

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};



const LanguageContext = createContext<LanguageContextType>({
  language: 'ru',
  setLanguage: () => {},
});

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20">
          {language.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setLanguage('ru')}>RU</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ro')}>RO</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('en')}>EN</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function PoliticalParties() {
  const [expandedParty, setExpandedParty] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState('ru');

  // Translations
  const translations = {
    en: {
      title: "Political Parties of Moldova",
      subtitle: "Learn more to make the right choice",
      founded: "Founded",
      leader: "Leader",
      spectrum: "Political Spectrum",
      about: "About",
      keyPolicies: "Key Policies",
      website: "Website",
      socialMedia: "Social Media",
      parliamentSeats: "Parliament Seats",
      noSeats: "No seats",
      seatsTooltip: "Quantity of seats in the Parliament",
      footer: "Moldova Political Parties Information. Data is for illustrative purposes only.",
      source: "Source",
      programs: "Documents",
    },
    ro: {
      title: "Partidele politice din Moldova",
      subtitle: "Aflați mai multe pentru a face alegerea corectă",
      founded: "Fondat",
      leader: "Lider",
      spectrum: "Spectru Politic",
      about: "Despre",
      keyPolicies: "Politici Cheie",
      website: "Site web",
      socialMedia: "Social Media",
      parliamentSeats: "Locuri în Parlament",
      noSeats: "Fără locuri",
      seatsTooltip: "Numărul de locuri în Parlament",
      footer: "Informații despre Partidele Politice din Moldova. Datele sunt doar în scop ilustrativ.",
      source: "Sursa",
      programs: "Documente",
    },
    ru: {
      title: "Политические Партии Молдовы",
      subtitle: "Узнайте больше, чтобы сделать правильный выбор",
      founded: "Год основания",
      leader: "Лидер",
      spectrum: "Политический спектр",
      about: "О партии",
      keyPolicies: "Ключевые тезисы",
      website: "Веб-сайт",
      socialMedia: "Социальные сети",
      parliamentSeats: "Места в Парламенте",
      noSeats: "Нет мест",
      seatsTooltip: "Количество мест в Парламенте",
      footer: "Информация о политических партиях Молдовы. Данные приведены только в иллюстративных целях.",
      source: "Источник",
      programs: "Документы",
    },
  };
  
  // Parties data
  const parties = [
    {
      name: {
        en: "Action and Solidarity Party",
        ro: "Partidul Acțiune și Solidaritate",
        ru: "Партия Действия и Солидарности"
      },
      founded: "2016",
      leader: "Igor Grosu",
      parliamentSeats: 62, 
      spectrum: {
        en: "Centre-right",
        ro: "Centru-dreapta",
        ru: "Центристско-правые"
      },
      description: {
        en: "The Action and Solidarity Party (PAS) aims to establish democratic, fair, and transparent governance focused on fighting corruption and supporting the rule of law. The main directions of the program include creating an independent and fair judicial system, strengthening private entrepreneurship, modernizing infrastructure, and improving social services.\n\nPAS emphasizes quality education and accessible healthcare, environmental protection, and support for the diaspora. In foreign policy, the party advocates for developing relations with the EU, cooperation with Romania and Ukraine, and maintaining pragmatic relations with Russia.",
        ro: "Partidul Acțiune și Solidaritate (PAS) urmărește să stabilească o guvernare democratică, corectă și transparentă, concentrată pe lupta împotriva corupției și susținerea statului de drept. Direcțiile principale ale programului includ crearea unui sistem judiciar independent și echitabil, consolidarea antreprenoriatului privat, modernizarea infrastructurii și îmbunătățirea serviciilor sociale.\n\nPAS pune accent pe educație de calitate și sănătate accesibilă, protecția mediului și sprijinul pentru diasporă. În politica externă, partidul pledează pentru dezvoltarea relațiilor cu UE, cooperarea cu România și Ucraina și menținerea relațiilor pragmatice cu Rusia.",
        ru: "Партия Действие и Солидарность (PAS) нацелена на построение демократического, честного и прозрачного управления, ориентированного на борьбу с коррупцией и поддержку верховенства закона. Основные направления программы включают создание независимой и справедливой судебной системы, укрепление частного предпринимательства, модернизацию инфраструктуры и улучшение социальных услуг.\n\nPAS уделяет особое внимание качественному образованию и доступному здравоохранению, защите окружающей среды и поддержке диаспоры. В области внешней политики партия выступает за развитие отношений с ЕС, сотрудничество с Румынией и Украиной и поддержание прагматичных отношений с Россией."
    },
      logoUrl: "/parties/pas.svg",
      leaderImageUrl: "/leaders/grosu.jpg",
      leaderImageSource: "http://oficial.md/politica/igor-grosu-candidat-oficial-la-sefia-pas",
      keyPolicies: {
        en: [
            "Democratic governance",
            "Rule of law",
            "Social services",
            "European integration",
            "Environmental protection"
        ],
        ro: [
            "Guvernare democratică",
            "Statul de drept",
            "Servicii sociale",
            "Integrarea europeană",
            "Protecția mediului"
        ],
        ru: [
            "Демократическое управление",
            "Верховенство закона",
            "Социальные услуги",
            "Европейская интеграция",
            "Защита окружающей среды"
        ]
    },programDocuments: [
      {
        title:"Program Politic",
        language: "ro",
        url: "/files/pas_ro.pdf"
      }],
      website: "https://unpaspentru.md",
      socialMedia: {
        facebook: "https://www.facebook.com/partidulpas/",
        twitter: "https://x.com/sandumaiamd",
      }
    },
    {
      name: {
        en: "Party of Socialists of the Republic of Moldova",
        ro: "Partidul Socialiștilor din Republica Moldova",
        ru: "Партия Социалистов Республики Молдова"
      },
      founded: "1997",
      leader: "Igor Dodon",
      leaderImageSource: "https://www.moldova.org/en/president-igor-dodon-opposes-making-9-may-day-europe-sticks-victory-day/",
      parliamentSeats: 18,  // As of the 2021 elections
      spectrum: {
        en: "Left-wing to far-left",
        ro: "Stânga până la extremă-stânga",
        ru: "Левые до крайне левых"
      },
      description: {
        en: "The Party of Socialists of the Republic of Moldova (PSRM) aims to establish a socially oriented and democratic state focused on citizens' needs. Key principles include protecting sovereignty, maintaining permanent neutrality, and strengthening national values, such as family and traditions. PSRM advocates for increased state control in strategic economic sectors, supporting high-tech industries and sustainable development of the agro-industrial complex.\n\nThe party promotes social justice and solidarity, especially for vulnerable groups. In foreign policy, PSRM seeks a balanced approach between East and West, aiming for closer ties with Russia and the CIS while maintaining relations with the European Union and other countries.",
        ro: "Partidul Socialiștilor din Republica Moldova (PSRM) își propune să creeze un stat social și democratic, orientat spre nevoile cetățenilor. Principiile cheie includ protejarea suveranității, menținerea neutralității permanente și consolidarea valorilor naționale, precum familia și tradițiile. PSRM susține creșterea controlului statului în sectoarele economice strategice, sprijinirea industriei high-tech și dezvoltarea durabilă a complexului agroindustrial.\n\nPartidul promovează justiția socială și solidaritatea, în special pentru grupurile vulnerabile. În politica externă, PSRM caută un echilibru între Est și Vest, dorind relații mai apropiate cu Rusia și CSI, dar și menținerea relațiilor cu Uniunea Europeană și alte țări.",
        ru: "Партия социалистов Республики Молдова (ПСРМ) ставит цель создать социально ориентированное и демократическое государство, ориентированное на потребности граждан. Основные принципы включают защиту суверенитета, постоянный нейтралитет и укрепление национальных ценностей, таких как семья и традиции. ПСРМ также стремится к усилению государственного контроля в стратегических секторах экономики, поддержке высокотехнологичных отраслей и устойчивому развитию агропромышленного комплекса.\n\nПартия продвигает идеи социальной справедливости и солидарности, особенно в отношении уязвимых групп населения. В области внешней политики ПСРМ выступает за баланс между Востоком и Западом, стремясь к более тесным связям с Россией и СНГ, при этом поддерживая отношения с Европейским Союзом и другими странами."
    },
      logoUrl: "/parties/socialists.svg",
      leaderImageUrl: "/leaders/dodon.jpg",
      keyPolicies: {
        en: [
            "Socially oriented state",
            "Neutrality",
            "Strengthening national values",
            "State control in strategic sectors",
            "Balanced foreign policy"
        ],
        ro: [
            "Stat social orientat",
            "Neutralitate",
            "Consolidarea valorilor naționale",
            "Control de stat în sectoarele strategice",
            "Politică externă echilibrată"
        ],
        ru: [
            "Социально ориентированное государство",
            "Нейтралитет",
            "Укрепление национальных ценностей",
            "Государственный контроль в стратегических секторах",
            "Сбалансированная внешняя политика"
        ]
    },
    programDocuments: [
      {
        title:"Program Politic",
        language: "ro",
        url: "/files/psrm_ro.pdf"
      },
{
      title: "Политическая программа",
      language: "ru",
      url: "/files/psrm_ru.pdf"}
    ],
    website: "http://socialistii.md",
      socialMedia: {
        facebook: "https://www.facebook.com/PartidulSocialistilor/",
        instagram: "https://www.instagram.com/socialistii/"
      }
    },
    {
      name: {
        en: "Party of Communists of the Republic of Moldova",
        ro: "Partidul Comuniștilor din Republica Moldova",
        ru: "Партия Коммунистов Республики Молдова",
      },
      founded: "1993",
      leader: "Vladimir Voronin",
      parliamentSeats: 8,
      spectrum: {
        en: "Far-left",
        ro: "Extremă-stânga",
        ru: "Крайне левые",
      },
      description: {
        en: "The Party of Communists of the Republic of Moldova (PCRM) considers itself a party representing the future interests of the entire society. The program emphasizes social, national, and political diversity, providing individuals with freedom of choice and conditions for self-realization. PCRM is committed to fighting poverty and ensuring wealth is derived from honest income rather than exploitation and corruption. The party advocates for equal conditions, social justice, and effective democratic control over the state. Its policies prioritize social investments, economic modernization, and a multi-level democracy based on transparency and accountability. PCRM also supports Moldova's neutrality, territorial integrity, and integration openness, aiming for a competitive state with a high standard of living and developed democracy.",
        ro: "Partidul Comuniștilor din Republica Moldova (PCRM) se consideră un partid al intereselor viitoare ale întregii societăți. Programul subliniază diversitatea socială, națională și politică, oferind individului libertatea de alegere și condiții pentru auto-realizare. PCRM este dedicat luptei împotriva sărăciei și asigurării ca bogăția să fie derivată din venituri oneste, nu din exploatare și corupție. Partidul militează pentru egalitatea condițiilor, justiție socială și control democratic eficient asupra statului. Politicile sale prioritizează investițiile sociale, modernizarea economică și o democrație multietajată bazată pe transparență și responsabilitate. PCRM susține, de asemenea, neutralitatea, integritatea teritorială și deschiderea pentru integrarea Moldovei, vizând un stat competitiv cu un standard de viață ridicat și o democrație dezvoltată.",
        ru: "Партия коммунистов Республики Молдова (ПКРМ) считает себя партией перспективных интересов всего общества. Программа подчеркивает социальное, национальное и политическое разнообразие, предоставляя личности свободу выбора и условия для самореализации. ПКРМ борется с бедностью и за то, чтобы богатство было результатом честного дохода, а не эксплуатации и коррупции. Партия выступает за равенство условий, социальную справедливость и действенный демократический контроль над государством. Политика партии включает приоритетные социальные инвестиции, экономическую модернизацию и многоуровневую демократию, основанную на прозрачности и подотчетности. ПКРМ поддерживает нейтралитет, территориальную целостность и интеграционную открытость Молдовы, стремясь к конкурентоспособному государству с высоким уровнем жизни и развитой демократией."
    },
      logoUrl: "/parties/communists.svg",
      leaderImageUrl: "/leaders/voronin.jpg",
      leaderImageSource: "https://pcrm.md/md/organele_de_conducere/vladimir_voronin",
      keyPolicies: {
        en: [
            "Social justice",
            "State control",
            "Democratic control",
            "Reintegration of Transnistria",
            "Economic modernization"
        ],
        ro: [
            "Justiție socială",
            "Control de stat",
            "Control democratic",
            "Reintegrarea Transnistriei",
            "Modernizare economică"
        ],
        ru: [
            "Социальная справедливость",
            "Государственный контроль",
            "Демократический контроль",
            "Реинтеграция Приднестровья",
            "Экономическая модернизация"
        ]
    },
    programDocuments: [
      {
        title:"Политическая программа",
        language: "ru",
        url: "/files/pcrm_ru.pdf"
      }],
      website: "https://www.pcrm.md",
      socialMedia: {
        facebook: "https://www.facebook.com/groups/pcrm17",
      },
    },
    {
      name: {
        en: "Party of Revival",
        ro: "Partidul «Renaștere»",
        ru: "Политическая Партия Возрождение",
      },
      founded: "2021",
      leader: "Natalia Parasca",
      parliamentSeats: 4,
      spectrum: {
        en: "Right-wing",
        ro: "Dreapta",
        ru: "Правые"
      },
      description: {
        en: "The 'Renaștere-Revival' party aims to establish a social state focused on supporting motherhood, youth, and vulnerable groups. The main priorities include maintaining Moldova's permanent neutrality, pursuing Eurasian integration, and fostering strategic cooperation with Russia. The party emphasizes traditional values such as family and Orthodox faith, aiming for economic development and social justice. Special attention is given to harmony in interethnic relations and safeguarding sovereignty.",
        ro: "Partidul 'Renaștere' urmărește crearea unui stat social, concentrat pe sprijinirea maternității, tineretului și grupurilor vulnerabile. Prioritățile principale includ menținerea neutralității permanente a Moldovei, integrarea eurasiatică și cooperarea strategică cu Rusia. Partidul pune accent pe valorile tradiționale, cum ar fi familia și credința ortodoxă, având ca scop dezvoltarea economică și justiția socială. O atenție specială este acordată armoniei relațiilor interetnice și apărării suveranității.",
        ru: "Партия «Renaștere-Возрождение» стремится создать социальное государство, ориентированное на поддержку материнства, молодежи и уязвимых слоев населения. Основные приоритеты включают постоянный нейтралитет Молдовы, евразийскую интеграцию и стратегическое сотрудничество с Россией. Партия уделяет внимание традиционным ценностям, таким как семья и православная вера, и нацелена на развитие экономики и обеспечение социальной справедливости. Особое внимание уделяется гармонии межнациональных отношений и защите суверенитета."
    },
      logoUrl: "/parties/renastere.png",
      leaderImageUrl: "/leaders/parasca.jpg",
      leaderImageSource: "http://curentul.md/stiri/natalia-parasca-renastere-este-partidul-care-se-afla-in-opozitie-reala-cu-pas.html",
      keyPolicies: {
        en: [
            "Social state",
            "Neutrality",
            "Eurasian integration",
            "Traditional values",
            "Economic development"
        ],
        ro: [
            "Stat social",
            "Neutralitate",
            "Integrare eurasiatică",
            "Valori tradiționale",
            "Dezvoltare economică"
        ],
        ru: [
            "Социальное государство",
            "Нейтралитет",
            "Евразийская интеграция",
            "Традиционные ценности",
            "Экономическое развитие"
        ]
    },
    programDocuments: [
      {
        title:"Политическая программа",
        language: "ru",
        url: "/files/pcrm_ru.pdf"
      }],
      website: "https://partidulrenastere.md",
      socialMedia: {
        facebook: "https://www.facebook.com/moldovarenastete",
        instagram: "https://www.instagram.com/renastere_md",
        youtube: "https://www.youtube.com/@Renastere_info"

      }
    },
    {
      name: {
        en: "National Alternative Movement",
        ro: "Mișcarea Alternativa Națională",
        ru: "Национальное Альтернативное Движение"
      },
      founded: "2022",
      leader: "Ion Ceban",
      parliamentSeats: 1,
      spectrum: {
        en: "Centre-right",
        ro: "Centru-dreapta",
        ru: "Центристско-правые"
      },
      description: {
        en: "The MAN (National Alliance of Moldova) party aims to modernize the Republic of Moldova, supporting European integration and social-democratic principles. Key priorities include improving quality of life, building a sustainable economy, developing social infrastructure, strengthening justice, and national security. MAN also backs educational reforms, environmental protection, and transparent governance, focusing on anti-corruption efforts and diaspora participation in the country's development. The party advocates for Moldova's reunification and the reintegration of Transnistria.",
        ro: "Partidul MAN (Alianța Națională a Moldovei) își propune modernizarea Republicii Moldova, susținând integrarea europeană și principiile social-democratice. Prioritățile principale includ îmbunătățirea calității vieții, construirea unei economii durabile, dezvoltarea infrastructurii sociale, consolidarea justiției și a securității naționale. MAN susține, de asemenea, reformele în educație, protecția mediului și guvernarea transparentă, concentrându-se pe eforturile anticorupție și participarea diasporei la dezvoltarea țării. Partidul pledează pentru reunificarea Moldovei și reintegrarea Transnistriei.",
        ru: "Партия MAN (Национальный Альянс Молдовы) стремится к модернизации Республики Молдова, поддерживая европейскую интеграцию и социально-демократические принципы. Основные приоритеты включают повышение качества жизни, построение устойчивой экономики, развитие социальной инфраструктуры, укрепление правосудия и национальной безопасности. MAN также поддерживает образовательные реформы, защиту окружающей среды и прозрачное управление, уделяя особое внимание борьбе с коррупцией и участию диаспоры в развитии страны. Партия выступает за объединение Молдовы и реинтеграцию Приднестровья."
    },
      logoUrl: "/parties/alternativa.svg",
      leaderImageUrl: "/leaders/ceban.jpg",
      leaderImageSource: "http://facebook.com",
      keyPolicies: {
        en: [
            "European integration",
            "Social justice",
            "Anti-corruption",
            "Education and healthcare",
            "Reintegration of Transnistria"
        ],
        ro: [
            "Integrarea europeană",
            "Justiție socială",
            "Lupta împotriva corupției",
            "Educație și sănătate",
            "Reintegrarea Transnistriei"
        ],
        ru: [
            "Европейская интеграция",
            "Социальная справедливость",
            "Борьба с коррупцией",
            "Образование и здравоохранение",
            "Реинтеграция Приднестровья"
        ]
    },
    programDocuments: [
      {
        title:"Политическая программа",
        language: "ru",
        url: "/files/man_ru.pdf"
      }],
      website: "https://alternativa.eu",
      socialMedia: {
        facebook: "https://www.facebook.com/PartidulPoliticMAN",
        twitter: "https://x.com/MAN__Party",
        instagram: "https://www.instagram.com/partidul_man/"
      }
    },
    {
      name: {
        en: "Our Party",
        ro: "Partidul Nostru",
        ru: "Политическая партия «Наша партия»"
      },
      founded: "1999 (rebranded in 2015)",
      leader: "Renato Usatîi",
      parliamentSeats: 0,  // As of the latest elections
      spectrum: {
        en: "Centre-left",
        ro: "Centru-stânga",
        ru: "Центристско-левые"
      },
      description: {
        en: "The 'Partidul Nostru' of Moldova seeks to modernize the country by addressing systemic issues in governance, economy, and social welfare. They advocate for combating corruption, revitalizing the local industry, promoting fair justice, and decentralizing administration.\n\nTheir agenda emphasizes strengthening agriculture, supporting education, protecting the environment, and ensuring social protection. Their goal is to establish Moldova's independent development path with pragmatic policies, prioritizing national interests.",
        ro: "Partidul 'Nostru' din Moldova urmărește modernizarea țării prin abordarea problemelor sistemice din guvernare, economie și asistență socială. Ei pledează pentru combaterea corupției, revitalizarea industriei locale, promovarea justiției corecte și descentralizarea administrației.\n\nAgenda lor pune accent pe întărirea agriculturii, susținerea educației, protejarea mediului și asigurarea protecției sociale. Scopul lor este de a stabili calea independentă de dezvoltare a Moldovei, cu politici pragmatice, prioritizând interesele naționale.",
        ru: "Партия 'Наша' Молдовы стремится модернизировать страну, решая системные проблемы в управлении, экономике и социальной защите. Они выступают за борьбу с коррупцией, возрождение местной промышленности, справедливую юстицию и децентрализацию управления.\n\nИх повестка дня подчеркивает укрепление сельского хозяйства, поддержку образования, защиту окружающей среды и социальную защиту. Их цель - установить независимый путь развития Молдовы с прагматичными политиками, отдающими приоритет национальным интересам."
      },
      logoUrl: "/parties/Partidul-Nostru.svg",
      leaderImageUrl: "/leaders/usatii.jpg",
      leaderImageSource: "http://ru1.md",
      keyPolicies: {
        en: [
          "Modernization plan",
          "Combating corruption",
          "Judicial fairness",
          "Economic revitalization",
          "Agricultural support",
          "Environmental protection",
          "Social protection",
          "Decentralization"
        ],
        ro: [
          "Plan de modernizare",
          "Combaterea corupției",
          "Corectitudine judiciară",
          "Revitalizarea economică",
          "Susținerea agriculturii",
          "Protecția mediului",
          "Protecție socială",
          "Descentralizare"
        ],
        ru: [
          "План модернизации",
          "Борьба с коррупцией",
          "Справедливая юстиция",
          "Экономическое возрождение",
          "Поддержка сельского хозяйства",
          "Защита окружающей среды",
          "Социальная защита",
          "Децентрализация"
        ]
      },
      programDocuments: [
        {
          title:"Program Politic",
          language: "ro",
          url: "/files/pn_ro.pdf"
        }],
      website: "https://pn.md",
      socialMedia: {
        facebook: "https://www.facebook.com/RU1.md",
        instagram: "https://www.instagram.com/usatii.renato"
      }
    },    
    
    {
      name: {
        en: "Liberal Democratic Party of Moldova",
        ro: "Partidul Liberal Democrat din Moldova",
        ru: "Либерально-демократическая партия Молдовы"
      },
      founded: "2007",
      leader: "Vlad Filat",
      parliamentSeats: 0,  // As of the latest elections
      spectrum: {
        en: "Centre-right",
        ro: "Centru-dreapta",
        ru: "Центристско-правые"
      },
      description: {
        en: "The Liberal Democratic Party of Moldova (PLDM) promotes a vision for a modernized and democratic Moldova, focusing on economic growth, social justice, and European integration. The party's principles include the rule of law, market economy, and protecting individual freedoms. It aims to address major national challenges such as poverty, depopulation, and state capture, while fostering democratic reforms.",
        ro: "Partidul Liberal Democrat din Moldova (PLDM) promovează o viziune pentru o Moldovă modernizată și democratică, concentrându-se pe creștere economică, justiție socială și integrare europeană. Principiile partidului includ supremația legii, economia de piață și protecția libertăților individuale. PLDM își propune să abordeze provocări majore naționale precum sărăcia, depopularea și capturarea statului, în timp ce promovează reformele democratice.",
        ru: "Либерально-демократическая партия Молдовы (PLDM) продвигает видение модернизированной и демократической Молдовы, сосредотачиваясь на экономическом росте, социальной справедливости и европейской интеграции. Принципы партии включают верховенство закона, рыночную экономику и защиту индивидуальных свобод. PLDM стремится решить основные национальные проблемы, такие как бедность, депопуляция и захват государства, одновременно способствуя демократическим реформам."
      },
      logoUrl: "/parties/pldm.svg",
      leaderImageUrl: "/leaders/filat.jpg",
      leaderImageSource: "https://property.point.md/ro/novosti/politika/vlad-filat-seichas-v-moldove-sozdaetsia-novyi-mediakholding/",
      keyPolicies: {
        en: [
          "Rule of law",
          "Economic growth",
          "Social justice",
          "European integration",
          "Democratic reforms"
        ],
      ro: [
          "Supremația legii",
          "Creștere economică",
          "Justiție socială",
          "Integrare europeană",
          "Reforme democratice"
        ],
        ru: [
          "Верховенство закона",
          "Экономический рост",
          "Социальная справедливость",
          "Европейская интеграция",
          "Демократические реформы"
        ]
      },
      programDocuments: [
        {
          title:"Program Politic",
          language: "ro",
          url: "/files/pldm_ro.pdf"
        }],
      website: "http://www.pldm.md",
      socialMedia: {
        facebook: "https://www.facebook.com/PLDMoldova",
      }
    },
    {
      name: {
        en: "Dignity and Truth Platform Party",
        ro: "Partidul Platforma Demnitate și Adevăr",
        ru: "Партия «Платформа достоинства и правды»"
      },
      founded: "2015",
      leader: "Dinu Plîngău",
      parliamentSeats: 0,  // As of the latest elections
      spectrum: {
        en: "Centre-right",
        ro: "Centru-dreapta",
        ru: "Центристско-правые"
      },
      description: {
        en: "Platforma DA is a center-right political party in Moldova, committed to European integration, democracy, and social solidarity. It was founded to oppose oligarchic regimes and promote the values of freedom, justice, and a market economy.",
        ro: "Platforma DA este un partid politic de centru-dreapta în Moldova, angajat în integrarea europeană, democrație și solidaritate socială. A fost fondat pentru a se opune regimurilor oligarhice și pentru a promova valorile libertății, dreptății și economiei de piață.",
        ru: "Платформа DA — это правоцентристская политическая партия в Молдове, приверженная европейской интеграции, демократии и социальной солидарности. Она была основана для противостояния олигархическим режимам и продвижения ценностей свободы, справедливости и рыночной экономики."
      },
      logoUrl: "/parties/platformada.svg",
      leaderImageUrl: "/leaders/plingau.jpg",
      leaderImageSource: "https://facebook.com",
      keyPolicies: {
        en: [
          "European integration",
          "Social market economy",
          "Justice reform",
          "Environmental sustainability",
          "Human rights protection",
          "Social welfare improvements",
          "Support for local agriculture"
        ],
        ro: [
          "Integrare europeană",
          "Economie socială de piață",
          "Reforma justiției",
          "Sustenabilitate ecologică",
          "Protecția drepturilor omului",
          "Îmbunătățirea asistenței sociale",
          "Susținerea agriculturii locale"
        ],
        ru: [
          "Европейская интеграция",
          "Социальная рыночная экономика",
          "Реформа правосудия",
          "Экологическая устойчивость",
          "Защита прав человека",
          "Улучшение социального обеспечения",
          "Поддержка местного сельского хозяйства"
        ]
      },
      programDocuments: [
        {
          title:"Program Politic",
          language: "ro",
          url: "/files/platformada_ro.pdf"
        }],
      website: "https://platformada.md",
      socialMedia: {
        facebook: "https://www.facebook.com/PlatformaDA/",
        instagram: "https://www.instagram.com/platforma.da/"
      }
    },
    {
      name: {
        en: "Alliance for the Union of Romanians",
        ro: "Alianța pentru Unirea Românilor",
        ru: "Альянс Объединения Румын"
      },
      founded: "2019",
      leader: "Boris Volosatîi",
      parliamentSeats: 0,  // As of the latest elections
      spectrum: {
        en: "Extreme Right-wing",
        ro: "Extremă dreaptă",
        ru: "Крайне правые"
      },
      description: {
        en: "The 'Alianța pentru Unirea Românilor' (AUR) party advocates for the unification of Romania and Moldova, aiming to correct historical injustices. Their platform emphasizes Romanian identity, Euro-Atlantic integration, and eliminating procedural barriers for reunification. They seek to harmonize legislation and strengthen Romanian governance across both countries, promoting shared infrastructure and economic development.",
        ro: "Partidul 'Alianța pentru Unirea Românilor' (AUR) pledează pentru unirea României și Republicii Moldova, având scopul de a corecta nedreptățile istorice. Platforma lor subliniază identitatea românească, integrarea euro-atlantică și eliminarea barierelor procedurale pentru reunificare. Ei doresc armonizarea legislației și întărirea guvernării românești în ambele țări, promovând infrastructura comună și dezvoltarea economică.",
        ru: "Партия 'Альянс за объединение румын' (AUR) выступает за объединение Румынии и Молдовы, с целью исправления исторической несправедливости. Их платформа подчеркивает румынскую идентичность, евроатлантическую интеграцию и устранение процедурных барьеров для воссоединения. Они стремятся гармонизировать законодательство и укрепить румынское управление в обеих странах, продвигая совместную инфраструктуру и экономическое развитие."
      },
      logoUrl: "/parties/AUR.svg",
      leaderImageUrl: "/leaders/volosatii.jpg",
      leaderImageSource: "https://facebook.com",

      keyPolicies: {
        en: [
          "Reunification of Romania and Moldova",
          "Romanian identity promotion",
          "Euro-Atlantic integration",
          "Legislation harmonization",
          "Infrastructure development",
          "Economic cooperation",
          "Social equity",
          "Public administration reform"
        ],
        ro: [
          "Reunificarea României și Republicii Moldova",
          "Promovarea identității românești",
          "Integrare euro-atlantică",
          "Armonizarea legislației",
          "Dezvoltarea infrastructurii",
          "Cooperare economică",
          "Echitate socială",
          "Reformă în administrația publică"
        ],
        ru: [
          "Объединение Румынии и Молдовы",
          "Продвижение румынской идентичности",
          "Евроатлантическая интеграция",
          "Гармонизация законодательства",
          "Развитие инфраструктуры",
          "Экономическое сотрудничество",
          "Социальное равенство",
          "Реформа государственной администрации"
        ]
      },
      programDocuments: [
        {
          title:"Политическая программа",
          language: "Program Politic",
          url: "/files/aur_ro.pdf"
        }],
      website: "https://partidulaur.md/",
      socialMedia: {
        facebook: "https://www.facebook.com/AlianțaUnireaRomânilor",
      }
    },
    {
      name: {
        en: "Liberal Party",
        ro: "Partidul Liberal",
        ru: "Либеральная партия"
      },
      founded: "1993",
      leader: "Dorin Chirtoacă",
      parliamentSeats: 0,  // As of the latest elections
      spectrum: {
        en: "Right-wing",
        ro: "Dreapta",
        ru: "Правые"
      },
      description: {
        en: "A right-wing party anchored in European liberalism, advocating for individual rights, democracy, the rule of law, and a free-market economy. The party prioritizes the reunification of Moldova with Romania and European integration.",
        ro: "Un partid de dreapta, ancorat în liberalismul european, care militează pentru drepturile individuale, democrație, stat de drept și o economie de piață liberă. Partidul prioritizează reunificarea Moldovei cu România și integrarea europeană.",
        ru: "Правоцентристская партия, приверженная европейскому либерализму, выступающая за права человека, демократию, верховенство закона и свободную рыночную экономику. Партия ставит приоритет на объединение Молдовы с Румынией и европейскую интеграцию."
      },
      logoUrl: "/parties/pl.png",
      leaderImageUrl: "/leaders/chirtoaca.jpg",
      leaderImageSource: "https://ro.wikipedia.org/wiki/Dorin_Chirtoacă",
      keyPolicies: {
        en: [
          "Reunification with Romania",
          "European Union and NATO integration",
          "Anti-corruption measures",
          "Economic liberalization",
          "Strengthening rule of law"
        ],
        ro: [
          "Reunificarea cu România",
          "Integrarea în Uniunea Europeană și NATO",
          "Măsuri anti-corupție",
          "Liberalizarea economică",
          "Consolidarea statului de drept"
        ],
        ru: [
          "Объединение с Румынией",
          "Интеграция в Европейский Союз и НАТО",
          "Антикоррупционные меры",
          "Экономическая либерализация",
          "Укрепление верховенства закона"
        ]
      },
      programDocuments: [
        {
          title:"Program Politic",
          language: "ro",
          url: "/files/pl_ro.pdf"
        }],
      website: "http://www.pl.md",
      socialMedia: {
        facebook: "https://www.facebook.com/partidulliberal",
      }
    },
    {
      name: {
        en: "Ecologist Green Party",
        ro: "Partidul Verde Ecologist",
        ru: "Политическая партия «Зеленая партия экологов»"
      },
      founded: "1992",
      leader: "Anatolie Prohnițchi",
      parliamentSeats: 0,  // As of the latest elections
      spectrum: {
        en: "Centre-left",
        ro: "Centru-stânga",
        ru: "Центристско-левые"
      },
      description: {
        en: "The Green Ecologist Party of Moldova is focused on environmental sustainability, social justice, and promoting non-violence. It emphasizes the need for policies that protect biodiversity, combat climate change, and support sustainable resource management. The party also advocates for social equity, gender equality, and extensive democracy, with a commitment to non-violence and human rights.",
        ro: "Partidul Verde Ecologist din Moldova este concentrat pe durabilitatea mediului, justiția socială și promovarea non-violenței. Accentuează necesitatea unor politici care să protejeze biodiversitatea, să combată schimbările climatice și să sprijine gestionarea durabilă a resurselor. Partidul pledează, de asemenea, pentru echitate socială, egalitate de gen și democrație extensivă, cu un angajament față de non-violență și drepturile omului.",
        ru: "Партия Зеленых Экологов Молдовы сосредоточена на экологической устойчивости, социальной справедливости и продвижении ненасилия. Она подчеркивает необходимость политики, которая защищает биоразнообразие, борется с изменением климата и поддерживает устойчивое управление ресурсами. Партия также выступает за социальное равенство, гендерное равенство и расширенную демократию, с приверженностью к ненасилию и правам человека."
      },
      logoUrl: "/parties/verde.png",
      leaderImageUrl: "/leaders/prohnitchi.jpg",
      leaderImageSource: "http://curentul.md/stiri/anatolie-prohnitchi-a-revenit-in-fruntea-pve.html",
      keyPolicies: {
        en: [
          "Environmental sustainability",
          "Social justice",
          "Non-violence",
          "Climate change combat",
          "Biodiversity protection",
          "Gender equality",
          "Extensive democracy",
          "Human rights protection"
        ],
        ro: [
          "Durabilitatea mediului",
          "Justiție socială",
          "Non-violență",
          "Combaterea schimbărilor climatice",
          "Protecția biodiversității",
          "Egalitatea de gen",
          "Democrație extensivă",
          "Protecția drepturilor omului"
        ],
        ru: [
          "Экологическая устойчивость",
          "Социальная справедливость",
          "Ненасилие",
          "Борьба с изменением климата",
          "Защита биоразнообразия",
          "Гендерное равенство",
          "Расширенная демократия",
          "Защита прав человека"
        ]
      },
      programDocuments: [
        {
          title:"Program Politic",
          language: "ro",
          url: "/files/greenmoldova_ro.pdf"
        }],
      website: "https://greenmoldova.org/",
      socialMedia: {
        facebook: "https://www.facebook.com/PartidulVerdeEcologist",
        twitter: "https://x.com/Green_Party_md",
        instagram: "https://www.instagram.com/verzii_ecologisti/",
      }
    },
    {
      name: {
        en: "National Liberal Party",
        ro: "Partidul Național Liberal",
        ru: "Национально-либеральная партия"
      },
      founded: "1993",
      leader: "Vitalia Pavlicenco",
      parliamentSeats: 0,  // As of the latest elections
      spectrum: {
        en: "Right-wing",
        ro: "Dreapta",
        ru: "Правые"
      },
      description: {
        en: "The National Liberal Party (PNL) of Moldova emphasizes the importance of Romanian identity, democracy, and integration into NATO and the EU. The party aims for economic modernization, social justice, and a firm stance on national security. PNL advocates for the unification of Moldova with Romania, emphasizing shared cultural and historical heritage while pursuing Western-oriented reforms.",
        ro: "Partidul Național Liberal (PNL) din Moldova subliniază importanța identității românești, democrației și integrării în NATO și UE. Partidul urmărește modernizarea economică, justiția socială și o poziție fermă în ceea ce privește securitatea națională. PNL pledează pentru unirea Moldovei cu România, subliniind moștenirea culturală și istorică comună în timp ce urmărește reforme orientate spre Occident.",
        ru: "Национал-либеральная партия (PNL) Молдовы подчеркивает важность румынской идентичности, демократии и интеграции в НАТО и ЕС. Партия нацелена на экономическую модернизацию, социальную справедливость и четкую позицию по национальной безопасности. PNL выступает за объединение Молдовы с Румынией, подчеркивая общие культурные и исторические корни, продолжая курс на западные реформы."
      },
      logoUrl: "/parties/pnl.jpg",
      leaderImageUrl: "/leaders/pavlicenco.jpg",
      leaderImageSource: "https://facebook.com",

      keyPolicies: {
        en: ["Romanian unification", "NATO and EU integration", "Economic modernization", "Social justice"],
        ro: ["Unificarea românească", "Integrarea în NATO și UE", "Modernizarea economică", "Justiția socială"],
        ru: ["Объединение с Румынией", "Интеграция в НАТО и ЕС", "Экономическая модернизация", "Социальная справедливость"]
      },
      programDocuments: [
        {
          title:"Program Politic",
          language: "ro",
          url: "/files/pnl_ro.pdf"
        }],
      website: "http://www.pnl.md",
      socialMedia: {
        facebook: "https://www.facebook.com/PNL.MD",
      }
    },
    {
      name: {
        en: "Party of Development and Consolidation of Moldova",
        ro: "Partidul Dezvoltării și Consolidării Moldovei",
        ru: "Политическая партия «Партия развития и консолидации Молдовы»"
      },
      founded: "2020",
      leader: "Ion Chicu",
      parliamentSeats: 0,  // As of the latest elections
      spectrum: {
        en: "Centre-right",
        ro: "Centru-dreapta",
        ru: "Центристско-правые"
      },
      description: {
        en: "The PDCM aims to unite Moldova's citizens around common national goals, promoting European integration, strengthening democratic institutions, and fostering economic development. The party seeks pragmatic professionals and intellectuals to take a leading role in revitalizing the country's social, economic, and political life.",
        ro: "PDCM își propune să unească cetățenii Moldovei în jurul unor obiective naționale comune, promovând integrarea europeană, consolidarea instituțiilor democratice și dezvoltarea economică. Partidul dorește să aducă în prim-plan profesioniști pragmatici și intelectuali pentru a revitaliza viața socială, economică și politică a țării.",
        ru: "ПРКМ стремится объединить граждан Молдовы вокруг общенациональных целей, продвигая европейскую интеграцию, укрепление демократических институтов и экономическое развитие. Партия стремится привлечь прагматичных профессионалов и интеллектуалов к ведущей роли в возрождении социально-экономической и политической жизни страны."
      },
      logoUrl: "/parties/pdcm.png",
      leaderImageUrl: "/leaders/chicu.jpg",
      leaderImageSource: "https://pdcm.md/ru/teams",
      keyPolicies: {
        en: [
          "European integration",
          "Strengthening democracy",
          "Economic development",
          "Combating corruption",
          "Social protection"
        ],
        ro: [
          "Integrare europeană",
          "Consolidarea democrației",
          "Dezvoltare economică",
          "Combaterea corupției",
          "Protecție socială"
        ],
        ru: [
          "Европейская интеграция",
          "Укрепление демократии",
          "Экономическое развитие",
          "Борьба с коррупцией",
          "Социальная защита"
        ]
      },
      programDocuments: [
        {
          title:"Политическая программа",
          language: "ru",
          url: "/files/pcrm_ru.pdf"
        }],
      website: "https://pdcm.md",
      socialMedia: {
        facebook: "https://www.facebook.com/pdcmoldova",
        youtube: "https://www.youtube.com/channel/UCQN29l7W6VGqVPUVVqs26bQ",
      }
    },

  ];

  
    
  const toggleExpand = (partyName: string) => {
    setExpandedParty(expandedParty === partyName ? null : partyName);
  };

  const t = translations[currentLanguage as keyof typeof translations];

  return (
    <LanguageContext.Provider value={{ language: currentLanguage, setLanguage: setCurrentLanguage }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
   <header className="bg-white/10 backdrop-blur-md shadow-lg">
    
  <div className="container mx-auto px-4 py-6 flex justify-between items-center">
    <div className="flex items-center gap-6">
      <img 
        src="/md-flag.svg" 
        alt="Moldova Flag" 
        className="h-8 w-12 rounded shadow-sm"
      />
      <div>
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="mt-2 text-blue-200">{t.subtitle}</p> 

      </div>
    </div>
    <LanguageSelector />
  </div>
</header>

<main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {parties.map((party) => (
              <motion.div
                key={party.name[currentLanguage as keyof typeof party.name]}
                layout
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className={expandedParty === party.name[currentLanguage as keyof typeof party.name] 
                  ? 'col-span-full' 
                  : ''
                }
              > <motion.div
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="h-full"
            >
              <Card className="bg-white bg-opacity-90 text-gray-800 transition-shadow duration-200 hover:shadow-xl shadow-md h-full relative">
              <CardHeader 
  className="cursor-pointer flex flex-row items-center justify-between"
  onClick={() => toggleExpand(party.name[currentLanguage as keyof typeof party.name])}
>
  <div className="flex items-center space-x-4">
    <img 
      src={party.logoUrl} 
      alt={`${party.name[currentLanguage as keyof typeof party.name]} logo`} 
      className="w-12 h-12 object-contain bg-gray-100 rounded-lg p-1"  // Changed from rounded-full to rounded-lg
    />
    <CardTitle className="text-xl font-semibold text-gray-800">
      {party.name[currentLanguage as keyof typeof party.name]}
    </CardTitle>
  </div>
  <motion.div
    animate={{ rotate: expandedParty === party.name[currentLanguage as keyof typeof party.name] ? 180 : 0 }}
    transition={{ duration: 0.7 }}
  >
    <ChevronDown className="h-6 w-6 text-gray-500" />
  </motion.div>
</CardHeader>
                  <CardContent>
                    <dl className="space-y-2 text-gray-600">
                      
                      <div>
                        <dt className="font-semibold">{t.leader}:</dt>
                        <dd>{party.leader}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">{t.founded}:</dt>
                        <dd>{party.founded}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold">{t.spectrum}:</dt>
                        <dd>{party.spectrum[currentLanguage as keyof typeof party.spectrum]}</dd>
                      </div>
                    </dl>
                    
                    <AnimatePresence>
  {expandedParty === party.name[currentLanguage as keyof typeof party.name] && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden"
    >
     <div className="mt-4 space-y-4">
  <div className="flex flex-col md:flex-row md:space-x-4">
    <div className="relative md:w-1/3">
      <img 
        src={party.leaderImageUrl} 
        alt={`${party.leader}`} 
        className="w-full rounded-lg shadow-md object-cover transition-all duration-700 ease-in-out"
      />
      {party.leaderImageSource && (
        <a 
          href={party.leaderImageSource}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 mt-1 block"
        >
          {t.source} ↗
        </a>
      )}
    </div>
    <div className="mt-4 md:mt-0 md:w-2/3">
  <div className="space-y-4">
    {party.description[currentLanguage as keyof typeof party.description]
      .split('\n\n')
      .map((paragraph, index) => (
        <p key={index} className="text-gray-600">
          {paragraph}
        </p>
    ))}
  </div>
            <h4 className="font-semibold text-lg mt-4 mb-2 text-gray-800">{t.keyPolicies}:</h4>
            <ul className="list-disc list-inside text-gray-600">
              {party.keyPolicies[currentLanguage as keyof typeof party.keyPolicies].map((policy, index) => (
                <li key={index}>{policy}</li>
              ))}
            </ul>
            <div className="mt-4">
  <h4 className="font-semibold text-lg mb-2 text-gray-800">{t.programs}:</h4>
  <div className="space-y-2">
    {party.programDocuments.map((doc, index) => (
      <div key={index} className="flex items-center space-x-2">
        <a 
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
        >
          {/* Document icon */}
          <svg 
            className="w-4 h-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          
          {/* Document title - now static */}
          {doc.title}
          
          {/* Language flag */}
          <img 
            src={`/flags/${doc.language}.svg`} 
            alt={doc.language.toUpperCase()} 
            className="w-4 h-4 inline-block"
          />
        </a>
      </div>
    ))}
  </div>
</div>
            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-2 text-gray-800">{t.website}:</h4>
              <a 
                href={party.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline flex items-center"
              >
                <Globe className="w-4 h-4 mr-2" />
                {party.website}
              </a>
            </div>
            <div className="mt-4">
  <h4 className="font-semibold text-lg mb-2 text-gray-800">{t.socialMedia}:</h4>
  <div className="flex space-x-4">
    {party.socialMedia.facebook && (
      <a 
        href={party.socialMedia.facebook} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:text-blue-800"
      >
        <Facebook className="w-6 h-6" />
      </a>
    )}
          {party.socialMedia.twitter && (
  <a 
    href={party.socialMedia.twitter} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-gray-900 hover:text-gray-700"
  >
    <XLogo className="w-6 h-6" />
  </a>
)}
              {party.socialMedia.instagram && (
      <a 
        href={party.socialMedia.instagram} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-pink-600 hover:text-pink-800"
      >
        <Instagram className="w-6 h-6" />
        </a>
    )}
    {party.socialMedia.youtube && (
      <a 
        href={party.socialMedia.youtube} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-red-600 hover:text-red-700"
      >
        <Youtube className="w-6 h-6" />
      </a>
    )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
<div className="absolute bottom-4 right-4">
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2 bg-blue-100 px-3 py-1.5 rounded-full cursor-help">
          <img 
            src="/icon-parliament.svg" 
            alt="Parliament seats" 
            className="w-4 h-4 text-blue-600"
          />
          <span className="font-semibold text-blue-600">
            {party.parliamentSeats > 0 
              ? party.parliamentSeats
              : t.noSeats
            }
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent 
        side="left"
        className="bg-gray-800 text-white px-3 py-1.5 text-sm"
      >
        <p>{t.seatsTooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</div>

                </CardContent>
              </Card>
              </motion.div>
              </motion.div>
            ))}
          </div>
        </main>

        <footer className="bg-white/5 backdrop-blur-md py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-sm text-blue-200">
            <p>© {new Date().getFullYear()} {t.footer}</p>
          </div>
        </footer>
      </div>
    </LanguageContext.Provider>
  );
}