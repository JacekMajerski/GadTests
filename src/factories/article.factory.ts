import { AddArticleModel } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomNewArticle(): AddArticleModel {
  const title = faker.person.firstName().replace(/[^A-Za-z]/g, '');
  const body = faker.lorem.paragraphs(5);

  const newArticle: AddArticleModel = {
    title: title,
    body: body,
  };

  return newArticle;
}
