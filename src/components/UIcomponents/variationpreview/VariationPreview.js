import React, { useState, useEffect } from "react";
import variationRequests from "../../../services/helpers/variationquery";

import Player from "../player/Player";

export default function VariationPreview(props) {
  const { variationKeyword } = props;

  let [fetchedDetails, setFetchedDetils] = useState(false);

  useEffect(() => {
    if (variationKeyword) {
      let queryData = {
        wordEntry: variationKeyword,
      };
      variationRequests
        .getDetailsOfWord(queryData)
        .then((res) => {
          console.log(res);
          if (res && res.wordEntry) {
            // if detail found do something
            setFetchedDetils(res);
            //
          }
        })
        .catch((err) => {
          if (err.status === "fail") {
            console.log("err", err.status);
            //
          }
        });
    }
  }, [variationKeyword]);

  console.log(variationKeyword);

  return (
    <div>
      {fetchedDetails && (
        <div>
          {" "}
          <span>
            {fetchedDetails.wordEntry} , {fetchedDetails.name} ,{" "}
            {fetchedDetails.ipa}{" "}
          </span>{" "}
          {fetchedDetails.url ? (
            <Player url={fetchedDetails.url} />
          ) : (
            <Player passive={true} />
          )}
        </div>
      )}
    </div>
  );
}
