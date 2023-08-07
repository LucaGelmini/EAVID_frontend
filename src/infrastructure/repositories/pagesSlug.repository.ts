import { PageSlug, PagesSlugDTO } from "../dataTransferObjects/PagesSlugDTO";
import client from "../graphql/apolloClient";
import pagesSlugQuery from "../graphql/pagesSlug.graphql";
import { Page } from "../../domain/models/Page";
import type { CSSProperties } from "react";

type ContactPageFields =
  | {
      isContactPage: true;
      contactMail: string;
    }
  | {
      isContactPage: false;
    };

const contactPageCast = (page: PageSlug): ContactPageFields => {
  const isContactPage = page.contactFormPage.paginaDeContacto;
  const contactMail = page.contactFormPage.correoDeContacto;

  if (isContactPage && contactMail) {
    return {
      isContactPage,
      contactMail: contactMail,
    };
  }
  return {
    isContactPage: false,
  };
};

const pagesSlug = async () => {
  const { data, loading, error } = await client.query<PagesSlugDTO>({
    query: pagesSlugQuery,
  });
  const pages: Page<CSSProperties>[] = data.pages.nodes.map((page) => ({
    id: page.databaseId,
    slug: page.slug,
    title: undefined,
    content: undefined,
    ...contactPageCast(page),
  }));
  return { pages, loading, error };
};

export default pagesSlug;
