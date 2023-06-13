import getJournalsLinks from "./getJournalsLinks.js";
import getPaperData from "./getPaperData.js";
import getReferences from "./getReferences.js";
import getAllPaperIds from "./getAllPaperIds.js";
import handle from "../handle.js";
import haveRef from "../DBHandle/getHaveRef.js";

async function root_hindawi() {
    await getJournalsLinks.start();

    await getPaperData.start();

    await handle.mergePaperData();

    await getAllPaperIds.start();

    await getReferences.start();

    await handle.mergePaperReferences();

    await haveRef.getIdList();
    await haveRef.papersHavRef();
    await haveRef.detailIdRef();
}

export default root_hindawi;
