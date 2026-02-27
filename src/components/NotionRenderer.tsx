'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { NotionRenderer as Renderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';

// Lazy loading heavy third-party components (recommended by react-notion-x)
const Code = dynamic(() =>
    import('react-notion-x/build/third-party/code').then((m) => m.Code)
);
const Collection = dynamic(() =>
    import('react-notion-x/build/third-party/collection').then(
        (m) => m.Collection
    )
);
const Equation = dynamic(() =>
    import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
);
const Pdf = dynamic(
    () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
    { ssr: false }
);
const Modal = dynamic(
    () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
    { ssr: false }
);

interface NotionRendererProps {
    recordMap: ExtendedRecordMap;
    rootPageId?: string;
}

export default function NotionRenderer({ recordMap, rootPageId }: NotionRendererProps) {
    return (
        <div className="notion-island-wrapper">
            <Renderer
                recordMap={recordMap}
                fullPage={false}
                darkMode={false}
                rootPageId={rootPageId}
                components={{
                    nextImage: Image,
                    nextLink: Link,
                    Code,
                    Collection,
                    Equation,
                    Modal,
                    Pdf,
                }}
                disableHeader={true}
            />
        </div>
    );
}
