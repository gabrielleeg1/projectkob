import React, { Suspense } from "react";

import Link from "next/link";
import { NextPage } from "next";

import { MdDns, MdAdd } from "react-icons/md";

import { useRecoilValue } from "recoil";

import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";

import { appListState } from "~/store/apps";

import { authorized } from "~/utils";

import { Layout } from "~/components";

import {
  Container,
  Items,
  AppLink,
  CreateAppButton,
  CreateAppLink,
  ItemsWrapper,
} from "./styles";

const Page: NextPage = () => {
  return (
    <Layout selected="apps" header={<h1>Apps</h1>}>
      <Container>
        <ItemsWrapper>
          <Suspense fallback={<AppsLoading />}>
            <Content />
          </Suspense>

          <Link href="/apps/new">
            <CreateAppButton>
              <MdAdd size={32} />
            </CreateAppButton>
          </Link>
        </ItemsWrapper>
      </Container>
    </Layout>
  );
};

const Content: React.VFC = () => {
  const apps = useRecoilValue(appListState);

  if (apps.length < 1) {
    return (
      <Alert severity="info">
        <AlertTitle>No apps found</AlertTitle>
        You can create a new app creating in the button in the bottom right
        corner or{" "}
        <strong>
          <Link href="/apps/new">
            <CreateAppLink>here</CreateAppLink>
          </Link>
        </strong>
      </Alert>
    );
  }

  return (
    <Items>
      {apps.map((app) => (
        <li key={app.id}>
          <Link href="/apps/[appId]" as={`/apps/${app.id}`}>
            <AppLink>
              <div className="icon">
                <MdDns size={18} />
              </div>

              <span className="name">{app.name}</span>
            </AppLink>
          </Link>
        </li>
      ))}
    </Items>
  );
};

const AppsLoading = () => (
  <Items>
    {Array.from(new Array(5)).map((id) => (
      <li key={id}>
        <Skeleton variant="rect" width="100%" height={61} />
      </li>
    ))}
  </Items>
);

export default authorized(Page);
