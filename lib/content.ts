export type Lang = "pt" | "en";

export const links = {
  email: "jonatasgomeslima21@gmail.com",
  whatsappLabel: "(71) 98314-4578",
  whatsapp: "https://wa.me/5571983144578",
  linkedin: "https://www.linkedin.com/in/jonatasgomes-dev/",
  github: "https://github.com/Jonatas-Gomes21",
  resume:
    "https://drive.google.com/file/d/1yvfdZQaKuVmY0cxs0Jac9dvO7TRaJjUm/view?usp=sharing",
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type Slide = { file: string; alt: string; label: string };

export type Project = {
  id: string;
  name: string;
  meta: string;
  status?: string;
  problemLabel: string;
  problem: string;
  builtLabel: string;
  built: string[];
  chips: string[];
  demo: { href: string; label: string };
  code?: { href: string; label: string };
  slides: Slide[];
  missingLabel: string;
};

type Dict = {
  meta: { title: string; description: string; ogAlt: string };
  skip: string;
  nav: {
    label: string;
    home: string;
    projects: string;
    path: string;
    contact: string;
    langLabel: string;
    themeLabel: string;
    menuOpen: string;
    menuClose: string;
    homeAria: string;
  };
  cta: string;
  hero: {
    typed: string;
    title: string;
    sub: string;
    secondary: string;
    photoAlt: string;
  };
  tech: { label: string };
  projects: { eyebrow: string; title: string; items: Project[]; demo: string };
  stack: {
    eyebrow: string;
    title: string;
    note: string;
    frontend: string;
    backend: string;
    center: string;
    seoNote: string;
  };
  services: {
    eyebrow: string;
    title: string;
    items: { title: string; text: string; list: string[] }[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { verb: string; text: string }[];
  };
  timeline: {
    eyebrow: string;
    title: string;
    items: {
      kind: string;
      period: string;
      title: string;
      place: string;
      detail: string;
    }[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    facts: { label: string; text: string }[];
    photoAlt: string;
    photoMissing: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    email: string;
    whatsapp: string;
    linkedin: string;
    github: string;
    resume: string;
    newTab: string;
  };
  footer: {
    tagline: string;
    navTitle: string;
    contactTitle: string;
    rights: string;
  };
};

export const dict: Record<Lang, Dict> = {
  pt: {
    meta: {
      title: "Jonatas Gomes | Desenvolvedor full stack",
      description:
        "Portfólio de Jonatas Gomes, desenvolvedor full stack de Lauro de Freitas, Bahia. Sites, sistemas web e APIs com TypeScript, React, Node.js e PostgreSQL.",
      ogAlt: "Jonatas Gomes, desenvolvedor full stack",
    },
    skip: "Pular para o conteúdo",
    nav: {
      label: "Navegação principal",
      home: "Início",
      projects: "Projetos",
      path: "Trajetória",
      contact: "Contato",
      langLabel: "Idioma",
      themeLabel: "Alternar tema claro e escuro",
      menuOpen: "Abrir menu",
      menuClose: "Fechar menu",
      homeAria: "Jonatas Gomes, ir para o início",
    },
    cta: "Falar comigo",
    hero: {
      typed: "Jonatas Gomes, desenvolvedor full stack",
      title: "Sites e sistemas web para negócios e times.",
      sub: "Full stack com React, Node.js e PostgreSQL. Estudante de Sistemas de Informação, em Lauro de Freitas, Bahia.",
      secondary: "Ver projetos",
      photoAlt:
        "Jonatas Gomes sorrindo, de camiseta bege, com as mãos unidas à frente",
    },
    tech: { label: "Tecnologias que uso" },
    projects: {
      eyebrow: "Projetos em destaque",
      title: "Dois projetos com demonstração online.",
      demo: "Ver demonstração",
      items: [
        {
          id: "amigo-pet",
          name: "Amigo Pet",
          meta: "Landing page para o nicho pet",
          status: "Em desenvolvimento",
          problemLabel: "O problema",
          problem:
            "Transmitir uma experiência premium de cuidado animal, combinando amor e natureza na identidade visual.",
          builtLabel: "O que eu construí",
          built: [
            "Landing page 100% responsiva, mobile first",
            "Animações de transição e de scroll",
            "SEO e semântica web",
            "Apresentação dos serviços e da marca",
          ],
          chips: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
          demo: {
            href: "https://amigo-petshop.vercel.app",
            label: "Demonstração",
          },
          code: {
            href: "https://github.com/Jonatas-Gomes21/Amigo-Pet",
            label: "Código",
          },
          slides: [
            {
              file: "amigo-pet-home.png",
              alt: "Página inicial do Amigo Pet: título sobre cuidado orgânico, botões de agendar e foto de um cão e um gato em uma loja com plantas",
              label: "Início",
            },
            {
              file: "amigo-pet-servicos.png",
              alt: "Seção de serviços do site Amigo Pet",
              label: "Serviços",
            },
            {
              file: "amigo-pet-diferencial.png",
              alt: "Seção de diferenciais da marca no site Amigo Pet",
              label: "Diferencial",
            },
          ],
          missingLabel: "Imagem pendente",
        },
        {
          id: "fl23",
          name: "FL23 Barbearia",
          meta: "Barbearia na Estrada do Coco, Lauro de Freitas",
          problemLabel: "O problema",
          problem:
            "Dar transparência ao cliente: ver o preço de cada serviço antes de sair de casa e agendar direto pelo WhatsApp.",
          builtLabel: "O que eu construí",
          built: [
            "Serviços e preços por categoria: cabelo, barba e detalhes, estilo e química, combos",
            "Botão de agendar em cada serviço e página de agendamento",
            "Planos mensais (Clube FL23), galeria e perguntas frequentes",
            "Mapa de localização e WhatsApp com mensagem pré-preenchida",
            "Metadados de SEO local",
          ],
          chips: [
            "Next.js 16",
            "React 19",
            "TypeScript 5",
            "Tailwind CSS 4",
            "shadcn/ui",
          ],
          demo: { href: "https://www.fl23.studio", label: "Demonstração" },
          slides: [
            {
              file: "fl23-home.png",
              alt: "Página inicial do site da FL23 Barbearia",
              label: "Início",
            },
            {
              file: "fl23-servicos.png",
              alt: "Lista de serviços e preços da FL23 Barbearia, organizada por categoria",
              label: "Serviços",
            },
            {
              file: "fl23-planos.png",
              alt: "Página de planos mensais do Clube FL23",
              label: "Planos",
            },
          ],
          missingLabel: "Imagem pendente",
        },
      ],
    },
    stack: {
      eyebrow: "Stack",
      title: "Do banco de dados à interface, no mesmo idioma.",
      note: "Next.js entra quando o projeto depende de SEO.",
      frontend: "Frontend",
      backend: "Backend",
      center: "Seu projeto",
      seoNote: "Next.js para projetos com foco em SEO",
    },
    services: {
      eyebrow: "O que eu faço",
      title: "Do site ao sistema, passando pela API.",
      items: [
        {
          title: "Sites",
          text: "Landing pages e sites institucionais que carregam rápido, funcionam bem no celular e aparecem nas buscas. É o que mais combina com pequenos negócios.",
          list: ["Mobile first", "SEO e semântica", "Animações com propósito"],
        },
        {
          title: "Sistemas web",
          text: "Interfaces em React ligadas a regras de negócio e a dados no PostgreSQL.",
          list: ["React", "TypeScript", "shadcn/ui", "PostgreSQL"],
        },
        {
          title: "APIs",
          text: "Back ends em Node.js com Fastify ou Express e Prisma, prontos para integrar com o seu front.",
          list: ["Fastify", "Express", "Prisma"],
        },
      ],
    },
    process: {
      eyebrow: "Como eu trabalho",
      title: "Do briefing à entrega.",
      steps: [
        {
          verb: "Ouvir",
          text: "Começo pelo briefing: o que você vende, para quem e o que precisa funcionar.",
        },
        {
          verb: "Planejar",
          text: "Defino páginas, dados e stack antes de abrir o editor e combino o que entra em cada entrega.",
        },
        {
          verb: "Construir",
          text: "TypeScript, mobile first e IA no fluxo para ganhar tempo, sempre revisando o que entra no código.",
        },
        {
          verb: "Revisar",
          text: "Testo no celular e no desktop, confiro acessibilidade e SEO e ajusto com você.",
        },
        {
          verb: "Entregar",
          text: "Publico o site ou sistema e entrego o código em um repositório no GitHub.",
        },
      ],
    },
    timeline: {
      eyebrow: "Trajetória",
      title: "Experiência e formação.",
      items: [
        {
          kind: "Experiência",
          period: "Jan a jun de 2024",
          title: "Desenvolvedor Frontend",
          place: "Unidev",
          detail: "React e Vue.js, em time que trabalhava com Scrum.",
        },
        {
          kind: "Curso",
          period: "2026",
          title: "Desenvolvedor Fullstack",
          place: "Sujeito Programador",
          detail: "Formação focada em desenvolvimento full stack.",
        },
        {
          kind: "Formação",
          period: "Conclusão prevista em 2028",
          title: "Bacharelado em Sistemas de Informação",
          place: "UNIFACS",
          detail: "Em andamento.",
        },
      ],
    },
    about: {
      eyebrow: "Sobre mim",
      title: "Quem está por trás do código.",
      paragraphs: [
        "Sou o Jonatas, mas quase todo mundo me chama de Jhon. Moro em Lauro de Freitas, na Bahia, estudo Sistemas de Informação na UNIFACS e trabalho como desenvolvedor full stack.",
        "Procuro meu primeiro estágio e também aceito projetos freelance, inclusive de fora do Brasil.",
      ],
      facts: [
        {
          label: "Hardware",
          text: "Tenho habilidade com hardware, o que me ajuda a entender o que acontece por baixo do código.",
        },
        {
          label: "IA no fluxo",
          text: "Uso IA no dia a dia para ganhar velocidade, mas reviso tudo que vai para o projeto.",
        },
      ],
      photoAlt: "Jonatas Gomes, desenvolvedor full stack",
      photoMissing: "Foto pendente",
    },
    contact: {
      eyebrow: "Contato",
      title: "Vamos construir o seu projeto?",
      text: "Estágio, freelance ou um site que precisa sair do papel. Escolha o canal que for melhor para você.",
      email: "E-mail",
      whatsapp: "WhatsApp",
      linkedin: "LinkedIn",
      github: "GitHub",
      resume: "Baixar currículo",
      newTab: "abre em uma nova aba",
    },
    footer: {
      tagline: "Desenvolvedor full stack em Lauro de Freitas, Bahia.",
      navTitle: "Navegação",
      contactTitle: "Contato",
      rights: "© 2026 Jonatas Gomes. Todos os direitos reservados.",
    },
  },
  en: {
    meta: {
      title: "Jonatas Gomes | Full stack developer",
      description:
        "Portfolio of Jonatas Gomes, a full stack developer from Lauro de Freitas, Bahia, Brazil. Websites, web systems and APIs built with TypeScript, React, Node.js and PostgreSQL.",
      ogAlt: "Jonatas Gomes, full stack developer",
    },
    skip: "Skip to content",
    nav: {
      label: "Main navigation",
      home: "Home",
      projects: "Projects",
      path: "Background",
      contact: "Contact",
      langLabel: "Language",
      themeLabel: "Toggle light and dark theme",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      homeAria: "Jonatas Gomes, back to top",
    },
    cta: "Talk to me",
    hero: {
      typed: "Jonatas Gomes, full stack developer",
      title: "Websites and web apps for businesses and teams.",
      sub: "Full stack with React, Node.js and PostgreSQL. Information Systems student based in Lauro de Freitas, Brazil.",
      secondary: "See projects",
      photoAlt:
        "Jonatas Gomes smiling, in a beige t-shirt, with his hands clasped in front of him",
    },
    tech: { label: "Technologies I use" },
    projects: {
      eyebrow: "Featured projects",
      title: "Two projects with live demos.",
      demo: "View demo",
      items: [
        {
          id: "amigo-pet",
          name: "Amigo Pet",
          meta: "Landing page for the pet niche",
          status: "In development",
          problemLabel: "The problem",
          problem:
            "Conveying a premium pet care experience, blending love and nature into the visual identity.",
          builtLabel: "What I built",
          built: [
            "A fully responsive, mobile first landing page",
            "Transition and scroll animations",
            "SEO and web semantics",
            "A showcase of the services and the brand",
          ],
          chips: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
          demo: {
            href: "https://amigo-petshop.vercel.app",
            label: "Demo",
          },
          code: {
            href: "https://github.com/Jonatas-Gomes21/Amigo-Pet",
            label: "Code",
          },
          slides: [
            {
              file: "amigo-pet-home.png",
              alt: "Amigo Pet home page: headline about organic care, booking buttons and a photo of a dog and a cat in a store full of plants",
              label: "Home",
            },
            {
              file: "amigo-pet-servicos.png",
              alt: "Services section of the Amigo Pet website",
              label: "Services",
            },
            {
              file: "amigo-pet-diferencial.png",
              alt: "Brand differentiators section of the Amigo Pet website",
              label: "Difference",
            },
          ],
          missingLabel: "Image pending",
        },
        {
          id: "fl23",
          name: "FL23 Barbearia",
          meta: "Barbershop on Estrada do Coco, Lauro de Freitas",
          problemLabel: "The problem",
          problem:
            "Transparency for customers: they see the price of every service before leaving home and book straight through WhatsApp.",
          builtLabel: "What I built",
          built: [
            "Services and prices by category: hair, beard and details, style and chemical, combos",
            "A book button on every service, plus a booking page",
            "Monthly plans (Clube FL23), a gallery and an FAQ",
            "A location map and WhatsApp with a pre-filled message",
            "Local SEO metadata",
          ],
          chips: [
            "Next.js 16",
            "React 19",
            "TypeScript 5",
            "Tailwind CSS 4",
            "shadcn/ui",
          ],
          demo: { href: "https://www.fl23.studio", label: "Demo" },
          slides: [
            {
              file: "fl23-home.png",
              alt: "Home page of the FL23 Barbearia website",
              label: "Home",
            },
            {
              file: "fl23-servicos.png",
              alt: "FL23 Barbearia list of services and prices, grouped by category",
              label: "Services",
            },
            {
              file: "fl23-planos.png",
              alt: "Clube FL23 monthly plans page",
              label: "Plans",
            },
          ],
          missingLabel: "Image pending",
        },
      ],
    },
    stack: {
      eyebrow: "Stack",
      title: "From the database to the interface, in one language.",
      note: "Next.js comes in when a project depends on SEO.",
      frontend: "Frontend",
      backend: "Backend",
      center: "Your project",
      seoNote: "Next.js for SEO-driven projects",
    },
    services: {
      eyebrow: "What I do",
      title: "From a website to a system, with an API in between.",
      items: [
        {
          title: "Websites",
          text: "Landing pages and company sites that load fast, work well on phones and show up in search. This is the best fit for small businesses.",
          list: ["Mobile first", "SEO and semantics", "Purposeful animation"],
        },
        {
          title: "Web systems",
          text: "React interfaces wired to business rules and to data in PostgreSQL.",
          list: ["React", "TypeScript", "shadcn/ui", "PostgreSQL"],
        },
        {
          title: "APIs",
          text: "Node.js back ends with Fastify or Express and Prisma, ready to plug into your front end.",
          list: ["Fastify", "Express", "Prisma"],
        },
      ],
    },
    process: {
      eyebrow: "How I work",
      title: "From brief to delivery.",
      steps: [
        {
          verb: "Listen",
          text: "I start with the brief: what you sell, who to, and what has to work.",
        },
        {
          verb: "Plan",
          text: "I define pages, data and stack before opening the editor, and agree on what goes into each delivery.",
        },
        {
          verb: "Build",
          text: "TypeScript, mobile first, and AI in the workflow to save time, always reviewing what lands in the code.",
        },
        {
          verb: "Review",
          text: "I test on phone and desktop, check accessibility and SEO, and adjust with you.",
        },
        {
          verb: "Ship",
          text: "I publish the site or system and hand over the code in a GitHub repository.",
        },
      ],
    },
    timeline: {
      eyebrow: "Background",
      title: "Experience and education.",
      items: [
        {
          kind: "Experience",
          period: "Jan to Jun 2024",
          title: "Frontend Developer",
          place: "Unidev",
          detail: "React and Vue.js, on a team working with Scrum.",
        },
        {
          kind: "Course",
          period: "2026",
          title: "Fullstack Developer",
          place: "Sujeito Programador",
          detail: "A program focused on full stack development.",
        },
        {
          kind: "Degree",
          period: "Expected graduation: 2028",
          title: "B.Sc. in Information Systems",
          place: "UNIFACS",
          detail: "In progress.",
        },
      ],
    },
    about: {
      eyebrow: "About me",
      title: "The person behind the code.",
      paragraphs: [
        "I'm Jonatas, though most people call me Jhon. I live in Lauro de Freitas, Bahia, study Information Systems at UNIFACS and work as a full stack developer.",
        "I'm looking for my first internship and I also take on freelance projects, including from outside Brazil.",
      ],
      facts: [
        {
          label: "Hardware",
          text: "I'm skilled with hardware, which helps me understand what happens underneath the code.",
        },
        {
          label: "AI in the workflow",
          text: "I use AI every day to move faster, but I review everything that goes into a project.",
        },
      ],
      photoAlt: "Jonatas Gomes, full stack developer",
      photoMissing: "Photo pending",
    },
    contact: {
      eyebrow: "Contact",
      title: "Shall we build your project?",
      text: "An internship, freelance work, or a site that needs to get off the ground. Pick whichever channel suits you.",
      email: "Email",
      whatsapp: "WhatsApp",
      linkedin: "LinkedIn",
      github: "GitHub",
      resume: "Download résumé",
      newTab: "opens in a new tab",
    },
    footer: {
      tagline: "Full stack developer in Lauro de Freitas, Bahia, Brazil.",
      navTitle: "Navigation",
      contactTitle: "Contact",
      rights: "© 2026 Jonatas Gomes. All rights reserved.",
    },
  },
};
