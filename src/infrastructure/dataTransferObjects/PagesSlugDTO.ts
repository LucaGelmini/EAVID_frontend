export type PageSlug = {
  databaseId: string;
  slug: string;
  contactFormPage: {
    paginaDeContacto: boolean | null;
    correoDeContacto: string | null;
  };
};

export type PagesSlugDTO = {
  pages: {
    nodes: PageSlug[];
  };
};
