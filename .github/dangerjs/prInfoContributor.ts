import { DangerDSLType, DangerResults } from "danger";
declare const danger: DangerDSLType;
declare const markdown: (message: string, results?: DangerResults) => void;

interface Contributor {
    login?: string;
}

const authorLogin = danger.github.pr.user.login;
const messageKnownContributor: string = `
#### Pull request review and merge process you can expect\n
👌 Hi *${authorLogin}*, thank you for your another contribution to \`espressif/esp-idf\` project!

If the change is approved and passes the tests in our internal git repository, on next sync merged change will appear in this public Github repository.

📘 Please check [Contributions Guide](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/contribute/index.html#contributions-guide) for the contribution checklist, information regarding code and documentation style, testing and other topics.
***
`;

const messageFirstContributor: string = `
#### Pull request review and merge process you can expect\n
👋 Welcome *${authorLogin}*, thank you for your first contribution to \`espressif/esp-idf\` project!

Espressif develops the ESP-IDF project in an internal repository (Gitlab). We do welcome contributions in the form of bug reports, feature requests and pull requests via this public GitHub repository.

1. An internal issue created for the PR, we assign it to the relevant engineer
2. They review the PR and either approve it or ask you for changes or clarifications
3. Once the Github PR is approved, we synchronize it into our internal git repository
4. In the internal git repository we do the final review, collect approvals from core owners and make sure all the automated tests are passing
    - At this point we may do some adjustments to the proposed change, or extend it by adding tests or documentation.
5. If the change is approved and passes the tests it is merged into the \`master\` branch
6. On next sync from the internal git repository merged change will appear in this public Github repository

📘 Please check [Contributions Guide](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/contribute/index.html#contributions-guide) for the contribution checklist, information regarding code and documentation style, testing and other topics.
***
`;

/**
 * Check if author of pull request is first time contributor and add message to PR with information about review and merge process.
 *
 * @dangerjs MARKDOWN
 */
export default async function (): Promise<string> {
    const contributors = await danger.github.api.repos.listContributors({
        owner: danger.github.thisPR.owner,
        repo: danger.github.thisPR.repo,
    });

    const contributorsData: Contributor[] = contributors.data;
    const knownContributors: (string | undefined)[] = contributorsData.map(
        (contributor: Contributor) => contributor.login
    );

    // if (knownContributors.includes(authorLogin)) {
    if (true) {
        return messageKnownContributor;
    } else {
        return messageFirstContributor;
    }
}
