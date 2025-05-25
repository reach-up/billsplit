import { scrapeBase64Bill } from "../../../lib/scrapeBill";
import logger from "../../../lib/logger";

export async function POST(req: Request) {
  const requestId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  logger.api.info(`Received OCR request`, { 
    context: { requestId, timestamp: new Date().toISOString() },
    tags: ['vision']
  });
  
  try {
    // Parse request body
    const body = await req.json();
    logger.api.debug(`Request parsed`, { 
      context: { requestId, keys: Object.keys(body) }
    });
    
    const { base64Image, mimeType } = body;
    
    if (!base64Image) {
      logger.api.error(`Missing base64Image in request`, { context: { requestId } });
      return Response.json({ error: 'Missing base64Image' }, { status: 400 });
    }
    
    // Log image metadata
    logger.api.info(`Processing image`, { 
      context: { 
        requestId,
        imageSize: base64Image.length,
        mimeType: mimeType || 'image/jpeg (default)'
      }
    });
    
    // Process the image
    const start = new Date();
    
    const output = await scrapeBase64Bill({
      base64Image,
      mimeType: mimeType || 'image/jpeg',
    });
    
    const endJson = new Date();
    const processingTime = (endJson.getTime() - start.getTime()) / 1000;
    
    // Log success metrics
    logger.api.info(`OCR processing successful`, { 
      context: { 
        requestId,
        processingTimeSeconds: processingTime,
        itemsExtracted: output.billItems?.length || 0,
        businessName: output.businessName,
        outputKeys: Object.keys(output)
      }
    });
    
    return Response.json(output);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Log detailed error information
    logger.api.error(`Error processing OCR request`, { 
      context: { 
        requestId,
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined
      }
    });
    
    return Response.json(
      { error: `Failed to process image: ${errorMessage}` },
      { status: 500 }
    );
  }
}
