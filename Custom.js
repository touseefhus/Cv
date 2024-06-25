
async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'pt', 'a4');
    const element = document.querySelector('.container');
    
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 595.28;
    const pageHeight = 841.89;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    pdf.save('resume.pdf');
}