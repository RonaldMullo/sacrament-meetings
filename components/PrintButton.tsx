"use client";

export default function PrintButton() {
  function handlePrint() {
    window.print();
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="print:hidden rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
    >
      Print Program
    </button>
  );
}