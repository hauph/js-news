/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import styles from "../../styles/scss/BaseLoading.module.scss";

type Props = {
  loadMore: boolean;
};

export function BaseLoading(props: Props) {
  const { loadMore } = props;
  return (
    <div className={`${styles["base-loading"]}${loadMore ? " load-more" : ""}`}>
      <img
        src={
          loadMore
            ? "https://cutewallpaper.org/21/loading-gif-transparent-background/Loading-GIF-on-Inspirationde.gif"
            : "https://cutewallpaper.org/21/loading-animated-gif-transparent-background/Twilight-on-the-olympic-peninsula.gif"
        }
        alt="Loading"
      />
    </div>
  );
}
