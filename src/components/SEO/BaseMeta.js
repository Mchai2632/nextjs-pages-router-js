import Head from "next/head";
import { useRouter } from "next/router";
import { layoutConfig } from "@/config/RootLayoutConfig";

export default function BaseMeta({ title, description, image, type = "website" }) {
  const router = useRouter();

  const defaultTitle = "MC BRANDD";
  const defaultDescription = "MC BRANDD TECHNOLOGY";
  const defaultImage = "/oliveRoseTravel_long.png";
  const defaultUrl = "https://oliverose-website.vercel.app";

  const canonicalUrl = `${defaultUrl}${router.asPath.split("?")[0]}`;

  return (
    <Head>
      <title>{`${title ? title + ` | ${defaultTitle}` : defaultTitle} `}</title>
      <link rel="icon" href={layoutConfig.faviconImage} key="fav_icon" />
      <meta name="description" content={description || defaultDescription} key="description" />
      <meta name="viewport" content="initial-scale=1, width=device-width" key="viewport" />
      <meta name="theme-color" content="#ffffff" key="theme-color" />
      <meta name="msapplication-TileColor" content="#ffffff" key="msapplication-TileColor" />
      <meta name="author" content="RA Group Travel & Tour" key="author" />

      {/* og */}
      <meta property="og:site_name" content="Olive & Rose Travel Services" key="site_name" />
      <meta property="og:title" content={title || defaultTitle} key="og_title" />
      <meta property="og:description" content={description || defaultDescription} key="og_description" />
      <meta property="og:image" content={image || defaultImage} key="og_image" />
      <meta property="og:url" content={canonicalUrl} key="og_url" />
      <meta property="og:type" content={type} key="og_type" />

      {/* twitter */}
      <meta name="twitter:card" content="summary_large_image" key="twitter_card" />
      <meta name="twitter:title" content={title || defaultTitle} key="twitter_title" />
      <meta name="twitter:description" content={description || defaultDescription} key="twitter_description" />
      <meta name="twitter:image" content={image || defaultImage} key="twitter_image" />

      <link rel="canonical" href={canonicalUrl} key="canonical" />
    </Head>
  );
}
