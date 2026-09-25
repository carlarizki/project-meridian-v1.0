import { DeckSlide } from '../components/views/ExecutiveDeckView';

export interface GenerateSlidesProgress {
  step: 'init' | 'create_presentation' | 'building_slides' | 'speaker_notes' | 'done' | 'error';
  message: string;
  presentationId?: string;
  presentationUrl?: string;
  percent: number;
}

export interface GenerateSlidesResult {
  presentationId: string;
  presentationUrl: string;
  title: string;
  slideCount: number;
}

// Convert hex color to Google Slides 0..1 RGB object
function hexToRgb(hex: string) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  return { red: r, green: g, blue: b };
}

export async function exportToGoogleSlides(
  accessToken: string,
  slides: DeckSlide[],
  onProgress?: (progress: GenerateSlidesProgress) => void
): Promise<GenerateSlidesResult> {
  const notify = (
    step: GenerateSlidesProgress['step'],
    message: string,
    percent: number,
    extra?: Partial<GenerateSlidesProgress>
  ) => {
    if (onProgress) {
      onProgress({ step, message, percent, ...extra });
    }
  };

  notify('create_presentation', 'Membuat berkas Google Slides baru di Google Drive Anda...', 10);

  // 1. Create a blank Google Slides presentation
  const title = `Project Meridian - Executive Presentation & Gap Analysis (${new Date().toLocaleDateString('id-ID')})`;
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Gagal membuat presentasi Google Slides (${createRes.status}): ${errorText}`);
  }

  const presentation = await createRes.json();
  const presentationId = presentation.presentationId;
  const presentationUrl = `https://docs.google.com/presentation/d/${presentationId}/edit`;

  notify('building_slides', `Presentasi dibuat! Menyusun layout slide komparatif...`, 25, {
    presentationId,
    presentationUrl,
  });

  // Get the default slide (if any) created by Google Slides
  const defaultSlideId = presentation.slides?.[0]?.objectId;

  // 2. Prepare batch update requests
  const requests: any[] = [];
  const slideObjectIds: string[] = [];

  // Slide 0: Title Slide (Customize the initial slide)
  if (defaultSlideId) {
    slideObjectIds.push(defaultSlideId);

    // Delete default placeholder textboxes if present on initial slide
    if (presentation.slides[0].pageElements) {
      for (const el of presentation.slides[0].pageElements) {
        requests.push({
          deleteObject: {
            objectId: el.objectId,
          },
        });
      }
    }

    // Add Dark Navy Background Card
    const titleBgId = `bg_title_${Date.now()}`;
    requests.push({
      createShape: {
        objectId: titleBgId,
        shapeType: 'RECTANGLE',
        elementProperties: {
          pageObjectId: defaultSlideId,
          size: {
            width: { magnitude: 720, unit: 'PT' },
            height: { magnitude: 405, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 0,
            translateY: 0,
            unit: 'PT',
          },
        },
      },
    });

    requests.push({
      updateShapeProperties: {
        objectId: titleBgId,
        fields: 'shapeBackgroundFill.solidFill.color',
        shapeProperties: {
          shapeBackgroundFill: {
            solidFill: {
              color: { rgbColor: hexToRgb('0f172a') }, // Deep Slate/Navy
            },
          },
        },
      },
    });

    // Title Card Box
    const titleBoxId = `txt_title_${Date.now()}`;
    requests.push({
      createShape: {
        objectId: titleBoxId,
        shapeType: 'RECTANGLE',
        elementProperties: {
          pageObjectId: defaultSlideId,
          size: {
            width: { magnitude: 640, unit: 'PT' },
            height: { magnitude: 270, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 40,
            translateY: 55,
            unit: 'PT',
          },
        },
      },
    });

    const titleSlideText =
      'PROJECT MERIDIAN · WORKFORCE INTELLIGENCE & GAP ANALYSIS\n' +
      'Analisis Komparatif: 6 Gap Dokumen Klien ("Bolong-Bolong") vs Solusi Nyata Meridian Dashboard\n\n' +
      'Transformasi 6.000 Tenaga Lapangan (Field Metering & Manual Operations) di Era Smart Meter (AMI) & Otomasi AI\n\n' +
      'Disusun untuk: Komite Audit, Dewan Direksi BUMN, & Pemimpin Transformasi Human Capital\n' +
      '✦ Payback 11,4 Bulan · Penghematan Bersih Rp 84,6 Miliar · 78% Redeployment Success Rate';

    requests.push({
      insertText: {
        objectId: titleBoxId,
        text: titleSlideText,
        insertionIndex: 0,
      },
    });

    // Style the title text
    requests.push({
      updateTextStyle: {
        objectId: titleBoxId,
        fields: 'foregroundColor,fontFamily,fontSize',
        textRange: { type: 'ALL' },
        style: {
          fontFamily: 'Google Sans',
          fontSize: { magnitude: 11, unit: 'PT' },
          foregroundColor: {
            opaqueColor: { rgbColor: hexToRgb('94a3b8') }, // Slate 400
          },
        },
      },
    });

    // Make the main title prominent
    requests.push({
      updateTextStyle: {
        objectId: titleBoxId,
        fields: 'foregroundColor,fontSize,bold',
        textRange: {
          type: 'FIXED_RANGE',
          startIndex: 58,
          endIndex: 147,
        },
        style: {
          bold: true,
          fontSize: { magnitude: 19, unit: 'PT' },
          foregroundColor: {
            opaqueColor: { rgbColor: hexToRgb('ffffff') }, // White
          },
        },
      },
    });

    // Make the header tag gold/blue
    requests.push({
      updateTextStyle: {
        objectId: titleBoxId,
        fields: 'foregroundColor,fontSize,bold',
        textRange: {
          type: 'FIXED_RANGE',
          startIndex: 0,
          endIndex: 57,
        },
        style: {
          bold: true,
          fontSize: { magnitude: 9.5, unit: 'PT' },
          foregroundColor: {
            opaqueColor: { rgbColor: hexToRgb('38bdf8') }, // Sky 400
          },
        },
      },
    });
  }

  // 3. Create slides for all gap analyses & executive briefings
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const slideObjectId = `slide_${i + 1}_${Date.now()}`;
    slideObjectIds.push(slideObjectId);

    // Create blank slide
    requests.push({
      createSlide: {
        objectId: slideObjectId,
        insertionIndex: i + (defaultSlideId ? 1 : 0),
        slideLayout: {
          predefinedLayout: 'BLANK',
        },
      },
    });

    // Slide Background
    const bgShapeId = `bg_${slideObjectId}`;
    requests.push({
      createShape: {
        objectId: bgShapeId,
        shapeType: 'RECTANGLE',
        elementProperties: {
          pageObjectId: slideObjectId,
          size: {
            width: { magnitude: 720, unit: 'PT' },
            height: { magnitude: 405, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 0,
            translateY: 0,
            unit: 'PT',
          },
        },
      },
    });
    requests.push({
      updateShapeProperties: {
        objectId: bgShapeId,
        fields: 'shapeBackgroundFill.solidFill.color',
        shapeProperties: {
          shapeBackgroundFill: {
            solidFill: {
              color: { rgbColor: hexToRgb('f8fafc') }, // Slate 50
            },
          },
        },
      },
    });

    // Top Header Box (Badge + Title + Subtitle)
    const headerBoxId = `hdr_${slideObjectId}`;
    requests.push({
      createShape: {
        objectId: headerBoxId,
        shapeType: 'RECTANGLE',
        elementProperties: {
          pageObjectId: slideObjectId,
          size: {
            width: { magnitude: 660, unit: 'PT' },
            height: { magnitude: 62, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 30,
            translateY: 16,
            unit: 'PT',
          },
        },
      },
    });

    const headerText = `${slide.badge.toUpperCase()} · ${slide.category.toUpperCase()}\n${slide.title}\n${slide.subtitle}`;
    requests.push({
      insertText: {
        objectId: headerBoxId,
        text: headerText,
        insertionIndex: 0,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: headerBoxId,
        fields: 'foregroundColor,fontFamily,fontSize',
        textRange: { type: 'ALL' },
        style: {
          fontFamily: 'Google Sans',
          fontSize: { magnitude: 9, unit: 'PT' },
          foregroundColor: {
            opaqueColor: { rgbColor: hexToRgb('64748b') }, // Slate 500
          },
        },
      },
    });

    // Make badge bold & blue
    const badgeEnd = slide.badge.length + slide.category.length + 3;
    requests.push({
      updateTextStyle: {
        objectId: headerBoxId,
        fields: 'foregroundColor,fontSize,bold',
        textRange: {
          type: 'FIXED_RANGE',
          startIndex: 0,
          endIndex: badgeEnd,
        },
        style: {
          bold: true,
          fontSize: { magnitude: 8.5, unit: 'PT' },
          foregroundColor: {
            opaqueColor: { rgbColor: hexToRgb('2563eb') }, // Blue 600
          },
        },
      },
    });

    // Make main slide title bold and dark
    const titleStart = badgeEnd + 1;
    const titleEnd = titleStart + slide.title.length;
    requests.push({
      updateTextStyle: {
        objectId: headerBoxId,
        fields: 'foregroundColor,fontSize,bold',
        textRange: {
          type: 'FIXED_RANGE',
          startIndex: titleStart,
          endIndex: titleEnd,
        },
        style: {
          bold: true,
          fontSize: { magnitude: 14, unit: 'PT' },
          foregroundColor: {
            opaqueColor: { rgbColor: hexToRgb('0f172a') }, // Slate 900
          },
        },
      },
    });

    // Left Column: Bolong-bolong Dokumen Klien (Rose card)
    const leftCardId = `left_${slideObjectId}`;
    requests.push({
      createShape: {
        objectId: leftCardId,
        shapeType: 'ROUNDED_RECTANGLE',
        elementProperties: {
          pageObjectId: slideObjectId,
          size: {
            width: { magnitude: 320, unit: 'PT' },
            height: { magnitude: 300, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 30,
            translateY: 82,
            unit: 'PT',
          },
        },
      },
    });

    requests.push({
      updateShapeProperties: {
        objectId: leftCardId,
        fields: 'shapeBackgroundFill.solidFill.color,outline',
        shapeProperties: {
          shapeBackgroundFill: {
            solidFill: {
              color: { rgbColor: hexToRgb('fff1f2') }, // Rose 50
            },
          },
          outline: {
            outlineFill: {
              solidFill: {
                color: { rgbColor: hexToRgb('fecdd3') }, // Rose 200
              },
            },
            weight: { magnitude: 1, unit: 'PT' },
            dashStyle: 'SOLID',
          },
        },
      },
    });

    // Symptoms formatted as bullet items
    const symptomsText = slide.bolong.symptoms.map((s) => `• ${s}`).join('\n');
    const leftCardText =
      `⚠️ CELAH DOKUMEN KLIEN (GAP MASALAH)\n` +
      `${slide.bolong.title}\n\n` +
      `${slide.bolong.description}\n\n` +
      `RISIKO / IMPACT:\n${slide.bolong.impactRisk}\n\n` +
      `GEJALA & INDIKASI:\n${symptomsText}`;

    requests.push({
      insertText: {
        objectId: leftCardId,
        text: leftCardText,
        insertionIndex: 0,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: leftCardId,
        fields: 'foregroundColor,fontFamily,fontSize',
        textRange: { type: 'ALL' },
        style: {
          fontFamily: 'Google Sans',
          fontSize: { magnitude: 8, unit: 'PT' },
          foregroundColor: {
            opaqueColor: { rgbColor: hexToRgb('334155') }, // Slate 700
          },
        },
      },
    });

    // Header styling for left card
    requests.push({
      updateTextStyle: {
        objectId: leftCardId,
        fields: 'foregroundColor,fontSize,bold',
        textRange: {
          type: 'FIXED_RANGE',
          startIndex: 0,
          endIndex: 37,
        },
        style: {
          bold: true,
          fontSize: { magnitude: 9, unit: 'PT' },
          foregroundColor: {
            opaqueColor: { rgbColor: hexToRgb('be123c') }, // Rose 700
          },
        },
      },
    });

    // Right Column: Solusi Meridian Intelligence (Emerald/Sky card)
    const rightCardId = `right_${slideObjectId}`;
    requests.push({
      createShape: {
        objectId: rightCardId,
        shapeType: 'ROUNDED_RECTANGLE',
        elementProperties: {
          pageObjectId: slideObjectId,
          size: {
            width: { magnitude: 320, unit: 'PT' },
            height: { magnitude: 300, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 370,
            translateY: 82,
            unit: 'PT',
          },
        },
      },
    });

    requests.push({
      updateShapeProperties: {
        objectId: rightCardId,
        fields: 'shapeBackgroundFill.solidFill.color,outline',
        shapeProperties: {
          shapeBackgroundFill: {
            solidFill: {
              color: { rgbColor: hexToRgb('f0fdf4') }, // Emerald 50
            },
          },
          outline: {
            outlineFill: {
              solidFill: {
                color: { rgbColor: hexToRgb('bbf7d0') }, // Emerald 200
              },
            },
            weight: { magnitude: 1, unit: 'PT' },
            dashStyle: 'SOLID',
          },
        },
      },
    });

    const deliverablesText = slide.solution.keyDeliverables.map((d) => `✓ ${d}`).join('\n');
    const rightCardText =
      `✦ SOLUSI MERIDIAN INTELLIGENCE\n` +
      `${slide.solution.title}\n\n` +
      `${slide.solution.description}\n\n` +
      `KEUNGGULAN OPERASIONAL:\n${slide.solution.meridianAdvantage}\n\n` +
      `DELIVERABLE IMPLEMENTASI:\n${deliverablesText}\n\n` +
      `METRIK: ${slide.solution.metricBadge}`;

    requests.push({
      insertText: {
        objectId: rightCardId,
        text: rightCardText,
        insertionIndex: 0,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: rightCardId,
        fields: 'foregroundColor,fontFamily,fontSize',
        textRange: { type: 'ALL' },
        style: {
          fontFamily: 'Google Sans',
          fontSize: { magnitude: 8, unit: 'PT' },
          foregroundColor: {
            opaqueColor: { rgbColor: hexToRgb('1f2937') }, // Gray 800
          },
        },
      },
    });

    // Header styling for right card
    requests.push({
      updateTextStyle: {
        objectId: rightCardId,
        fields: 'foregroundColor,fontSize,bold',
        textRange: {
          type: 'FIXED_RANGE',
          startIndex: 0,
          endIndex: 31,
        },
        style: {
          bold: true,
          fontSize: { magnitude: 9, unit: 'PT' },
          foregroundColor: {
            opaqueColor: { rgbColor: hexToRgb('047857') }, // Emerald 700
          },
        },
      },
    });

    // Footer note
    const footerId = `ftr_${slideObjectId}`;
    requests.push({
      createShape: {
        objectId: footerId,
        shapeType: 'RECTANGLE',
        elementProperties: {
          pageObjectId: slideObjectId,
          size: {
            width: { magnitude: 660, unit: 'PT' },
            height: { magnitude: 14, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 30,
            translateY: 387,
            unit: 'PT',
          },
        },
      },
    });

    requests.push({
      insertText: {
        objectId: footerId,
        text: `Project Meridian · Field Metering & Manual Ops Pilot (6.000 Staf) · Halaman ${i + 1} dari ${slides.length}`,
        insertionIndex: 0,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: footerId,
        fields: 'foregroundColor,fontFamily,fontSize',
        textRange: { type: 'ALL' },
        style: {
          fontFamily: 'Google Sans',
          fontSize: { magnitude: 7, unit: 'PT' },
          foregroundColor: {
            opaqueColor: { rgbColor: hexToRgb('94a3b8') },
          },
        },
      },
    });
  }

  notify('building_slides', `Mengirim batch update layout presentasi ke Google Slides...`, 55);

  // Send batch update for slide creation and formatting
  const batchRes = await fetch(`https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requests }),
  });

  if (!batchRes.ok) {
    const errorText = await batchRes.text();
    console.error('Batch update failed:', errorText);
    throw new Error(`Gagal memformat slide Google Slides (${batchRes.status}): ${errorText}`);
  }

  notify('speaker_notes', 'Mengisi Speaker Notes / Talking Points untuk setiap slide...', 80);

  // 4. Update speaker notes by fetching presentation to get speakerNotesObjectId
  try {
    const presDetailRes = await fetch(`https://slides.googleapis.com/v1/presentations/${presentationId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (presDetailRes.ok) {
      const presData = await presDetailRes.json();
      const noteRequests: any[] = [];

      // For slide 0 (title slide)
      const titleSlide = presData.slides?.[0];
      const titleNotesId = titleSlide?.slideProperties?.notesPage?.notesProperties?.speakerNotesObjectId;
      if (titleNotesId) {
        noteRequests.push({
          insertText: {
            objectId: titleNotesId,
            text:
              'TALKING POINTS PEMBUKA (PITCH TO BOARD OF DIRECTORS):\n\n' +
              '• Selamat pagi Bapak/Ibu Direksi dan Komite Audit. Hari ini kami memaparkan Project Meridian — sistem workforce intelligence untuk transisi 6.000 tenaga alih daya dan teknisi lapangan (Field Metering & Manual Operations) PLN yang terdampak program smart meter (AMI) dan otomasi AI.\n' +
              '• Dokumen requirement sebelumnya menyisakan 6 celah kritis ("bolong-bolong") yang berisiko fatal terhadap anggaran dan hubungan industrial dengan Serikat Pekerja. Di deck ini, kami menunjukkan bagaimana setiap celah telah diatasi secara tuntas di dalam sistem Meridian.',
            insertionIndex: 0,
          },
        });
      }

      // For each subsequent slide
      if (presData.slides && presData.slides.length > 1) {
        for (let i = 0; i < slides.length; i++) {
          const slide = slides[i];
          const slideObj = presData.slides[i + 1];
          const speakerNotesId = slideObj?.slideProperties?.notesPage?.notesProperties?.speakerNotesObjectId;

          if (speakerNotesId && slide.talkingPoints?.length > 0) {
            const notesContent =
              `TALKING POINTS PRESENTER (SLIDE ${i + 1} - ${slide.title}):\n\n` +
              slide.talkingPoints.map((tp, idx) => `${idx + 1}. ${tp}`).join('\n\n') +
              `\n\n[Meridian Metric Key]: ${slide.solution.metricBadge}`;

            noteRequests.push({
              insertText: {
                objectId: speakerNotesId,
                text: notesContent,
                insertionIndex: 0,
              },
            });
          }
        }
      }

      if (noteRequests.length > 0) {
        await fetch(`https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requests: noteRequests }),
        });
      }
    }
  } catch (notesErr) {
    // Non-fatal if notes update fails, main slides are already created!
    console.warn('Failed to insert speaker notes:', notesErr);
  }

  notify('done', 'Presentasi Google Slides berhasil dibuat dengan sempurna!', 100, {
    presentationId,
    presentationUrl,
  });

  return {
    presentationId,
    presentationUrl,
    title,
    slideCount: slides.length + 1,
  };
}
