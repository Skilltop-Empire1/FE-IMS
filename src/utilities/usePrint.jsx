import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const usePrint = () => {
  const printRef = useRef(null)

  const triggerPrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Exported Document',
  })

  return { printRef, triggerPrint }
}

export default usePrint
