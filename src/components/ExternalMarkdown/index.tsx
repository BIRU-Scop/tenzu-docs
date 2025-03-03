import {ReactNode, useReducer} from 'react';
import Markdown from "react-markdown";
import {DispatchMessage, GitHubReference} from "docusaurus-theme-github-codeblock/build/theme/types";
import remarkGfm from "remark-gfm";
import rehypeCallouts from "rehype-callouts";
import 'rehype-callouts/theme/github'

const initialFetchResultState = {
    code: 'loading...',
    error: null,
    loading: null,
}

const noteStyle: React.CSSProperties = {
    fontSize: '.9em',
    fontWeight: 600,
    color: '#0E75DD',
    textAlign: 'right',
    paddingBottom: '13px',
    textDecoration: 'underline',
}

/**
 * parses GitHub reference
 * @param {string} ref url to github file
 */
export function parseReference (ref: string): GitHubReference {
    const [url, loc] = ref.split('#')


    const [org, repo, blob, branch, ...pathSeg] = new URL(url).pathname.split('/').slice(1)
    let [fromLine, toLine] = loc
        ? loc.split('-').map((lineNr) => parseInt(lineNr.slice(1), 10) - 1)
        : [0, Infinity]

    return {
        url: `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${pathSeg.join('/')}`,
        fromLine,
        toLine,
        title: pathSeg.join('/')
    }
}

async function fetchCode ({ url, fromLine, toLine }: GitHubReference, fetchResultStateDispatcher: React.Dispatch<DispatchMessage>, startLine: string|null) {
    let res: Response

    try {
        res = await fetch(url)
    } catch (err) {
        return fetchResultStateDispatcher({ type: 'error', value: err as Error })
    }

    if (res.status !== 200) {
        const error = await res.text()
        return fetchResultStateDispatcher({ type: 'error', value: error })
    }

    let body = (await res.text()).split('\n').slice(fromLine, (toLine || fromLine) + 1)
    if (startLine !== null) {
        body = body.slice(body.indexOf(startLine));
    }
    const preceedingSpace = body.reduce((prev: number, line: string) => {
        if (line.length === 0) {
            return prev
        }

        const spaces = line.match(/^\s+/)
        if (spaces) {
            return Math.min(prev, spaces[0].length)
        }

        return 0
    }, Infinity)

    return fetchResultStateDispatcher({
        type: 'loaded',
        value: body.map((line) => line.slice(preceedingSpace)).join('\n')
    })
}

export function codeReducer (prevState: any, { type, value }: DispatchMessage) {
    switch (type) {
        case 'reset': {
            return initialFetchResultState;
        }
        case 'loading': {
            return {...prevState, loading: true};
        }
        case 'loaded': {
            return {...prevState, code: value, loading: false};
        }
        case 'error': {
            return {...prevState, error: value, loading: false};
        }
        default:
            return prevState;
    }
}

type RefMarkdownProps = {
    reference: string;
    startLine: string|null;
};

export default function ExternalMarkdown({reference, startLine}: RefMarkdownProps): ReactNode {
    const [fetchResultState, fetchResultStateDispatcher] = useReducer(
        codeReducer,
        initialFetchResultState,
    )

    const codeSnippetDetails = parseReference(reference)
    if (fetchResultState.loading !== false) {
        fetchCode(codeSnippetDetails, fetchResultStateDispatcher, startLine)
    }

    return (
    <div>
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeCallouts]}>{fetchResultState.code}</Markdown>
        <div style={noteStyle} className='github-codeblock-reference-link'>
            <a href={reference} target="_blank">View on GitHub</a>
        </div>
    </div>
    );
}