import { GraphQLClient } from 'graphql-request';

import { getSdk } from '~/generated/schema.server';

export const graphcms = new GraphQLClient(
  process.env.GRAPHCMS_ENDPOINT as string,
);

export function sdk({
  preview,
}: {
  preview?: boolean;
}): ReturnType<typeof getSdk> {
  const API_TOKEN = preview
    ? process.env.GRAPHCMS_DEV_TOKEN
    : process.env.GRAPHCMS_PROD_TOKEN;

  graphcms.setHeader(`authorization`, `Bearer ${API_TOKEN}`);

  try {
    return getSdk(graphcms);
  } catch (error: any) {
    console.error(JSON.stringify(error, undefined, 2));
    return error;
  }
}
