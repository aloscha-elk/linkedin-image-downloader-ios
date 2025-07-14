// LinkedIn Image Extractor for iOS Scriptable
// Downloads images from LinkedIn posts to Photos app
// Automatically filters out avatars and profile pictures

let url;

// Get URL from Share Sheet or clipboard
if (args.urls && args.urls.length > 0) {
    url = args.urls[0];
} else if (args.plainTexts && args.plainTexts.length > 0) {
    url = args.plainTexts[0];
} else {
    url = await Pasteboard.paste();
}

if (!url || !url.includes('linkedin.com')) {
    throw new Error('Please provide a LinkedIn URL via Share or copy to clipboard');
}

console.log(`🔍 Processing: ${url}`);

let req = new Request(url);
req.headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
};

try {
    let html = await req.loadString();
    let regex = /https:\/\/media(?:-exp[0-9])?\.licdn\.com\/[^"'\s>]*/g;
    let urls = html.match(regex) || [];
    
    urls = [...new Set(urls)]; // remove duplicates
    
    if (urls.length === 0) {
        console.log('❌ No images found');
        return;
    }
    
    console.log(`📷 Found ${urls.length} image URLs:`);
    urls.forEach((url, index) => {
        console.log(`${index + 1}. ${url.split('/').pop()}`);
    });
    
    let savedCount = 0;
    let skippedCount = 0;
    
    // Process each image with delay
    for (let i = 0; i < urls.length; i++) {
        let imgUrl = urls[i];
        console.log(`\n🔄 Processing ${i + 1}/${urls.length}`);
        
        try {
            let imgReq = new Request(imgUrl);
            let img = await imgReq.loadImage();
            
            console.log(`📏 Size: ${img.size.width}x${img.size.height}`);
            
            // Skip avatars (small square images)
            if ((img.size.width <= 100 && img.size.height <= 100) || 
                (img.size.width === img.size.height && img.size.width <= 200)) {
                console.log(`⏭️ Skipped avatar`);
                skippedCount++;
            } else {
                await Photos.save(img);
                console.log(`✅ Saved to Photos!`);
                savedCount++;
            }
            
            // Small pause between images to avoid rate limiting
            if (i < urls.length - 1) {
                await new Promise(resolve => Timer.schedule(500, false, resolve));
            }
            
        } catch (e) {
            console.log(`❌ Error: ${e.message}`);
        }
    }
    
    console.log(`\n🎉 DONE!`);
    console.log(`📊 Result: ${savedCount} saved, ${skippedCount} skipped`);
    
} catch (e) {
    console.log(`❌ Error: ${e.message}`);
}