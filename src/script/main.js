import test from './test.js'
import mergerFiles from './handle.js'
import getPaperData from './getPaperData.js'
import getReferences from './getReferences.js'
import getAllPaperIds from './getAllPaperIds.js'
import getJournalsLinks from './getJournalsLinks.js'

async function start() {
    const t0 = performance.now()

    await getJournalsLinks.start()
    const t1 = performance.now()
    console.log('Time: ', t1-t0)

    await getPaperData.start()
    const t2 = performance.now()
    console.log('Time: ', t2-t1)

    await mergerFiles.mergePaperData()
    const t3 = performance.now()
    console.log('Time: ', t3-t2)

    await getAllPaperIds.start()
    const t4 = performance.now()
    console.log('Time: ', t4-t3)

    await getReferences.start()
    const t5 = performance.now()
    console.log('Time: ', t5-t4)

    await mergerFiles.mergePaperReferences()
    const t6 = performance.now()
    console.log('Time: ', t6-t5)
}

// start()
test.caculator()
