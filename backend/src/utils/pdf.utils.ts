import PdfPrinter from 'pdfmake';
import type { TDocumentDefinitions, StyleDictionary } from 'pdfmake/interfaces';
import { EventEntity } from 'src/modules/event/entities/event.entity';
import * as path from 'path';

export async function createPdfFromEvents(
  events: EventEntity[],
): Promise<Buffer> {
  
  const fonts = {
    Roboto: {
      normal: path.resolve(
        process.cwd(),
        'src/utils/fonts/Roboto/static/Roboto-Regular.ttf',
      ),
      bold: path.resolve(
        process.cwd(),
        'src/utils/fonts/Roboto/static/Roboto-Bold.ttf',
      ),
    },
  };

  const printer = new PdfPrinter(fonts);

  const styles: StyleDictionary = {
    header: {
      fontSize: 20,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 20],
    },
    title: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 5],
    },
  };

  const docDefinition: TDocumentDefinitions = {
    content: [
      { text: 'DANH SÁCH SỰ KIỆN', style: 'header' },
      ...events.flatMap((event, i) => [
        { text: `${i + 1}. ${event.title}`, style: 'title' },
        { text: `- Bắt đầu: ${formatDate(event.timeStart)}` },
        { text: `- Kết thúc: ${formatDate(event.timeEnd)}` },
        { text: `- Địa điểm: ${event.location || 'Không có'}` },
        { text: `- Mô tả: ${event.description || 'Không có'}` },
        { text: ' ' },
      ]),
    ],
    styles,
    defaultStyle: {
      font: 'Roboto',
    },
  };

  return new Promise((resolve, reject) => {
    try {
      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      const chunks: Buffer[] = [];

      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.on('error', (err) => reject(err));

      pdfDoc.end();
    } catch (err) {
      reject(err);
    }
  });
}

function formatDate(date: Date | string | undefined): string {
  if (!date) return 'Không xác định';
  const d = new Date(date);
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(d);
}
