const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '../manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const docs = [];

for (const group of manifest.docs) {
    for (const item of group.items) {
        // manifest paths are relative to the repository root
        const filePath = path.join(__dirname, '..', item.path);
        try {
            if (fs.existsSync(filePath)) {
                const markdown = fs.readFileSync(filePath, 'utf8');

                // Strip out basic markdown syntax
                const content = markdown
                    .replace(/#+\s/g, '') // remove headings
                    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // remove links but keep text
                    .replace(/```[\s\S]*?```/g, '') // remove code blocks
                    .replace(/`([^`]+)`/g, '$1') // inline code
                    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
                    .replace(/\*([^*]+)\*/g, '$1'); // italic

                if (content.trim().length > 0) {
                    docs.push({
                        title: item.title,
                        slug: item.slug,
                        content: content.trim()
                    });
                }
            } else {
                console.warn(`Warning: File not found at ${filePath}`);
            }
        } catch (err) {
            console.error(`Failed to read markdown for ${item.path}:`, err);
        }
    }
}

const outputPath = path.join(__dirname, '../search-index.json');
fs.writeFileSync(outputPath, JSON.stringify(docs, null, 2));
console.log(`Successfully generated search-index.json with ${docs.length} documents.`);
