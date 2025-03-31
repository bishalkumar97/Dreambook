import DOMPurify from "dompurify"

export default function SanitizeHtml({rawString}) {
    const sanitizedHtmlString = DOMPurify.sanitize(rawString);

    return (
        <div dangerouslySetInnerHTML={{ __html: sanitizedHtmlString }} />
    )
}
