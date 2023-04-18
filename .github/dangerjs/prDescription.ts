/**
 * Check if PR has accurate description".
 *
 * @dangerjs WARN
 */

import { DangerDSLType, DangerResults } from "danger";
declare const danger: DangerDSLType;
declare const warn: (message: string, results?: DangerResults) => void;

export default function (): void {
	const prDescription: string = danger.github.pr.body;
	const shortPrDescriptionThreshold: number = 100; // Description is considered too short below this number of characters

	if (prDescription.length < shortPrDescriptionThreshold) {
		return warn('The PR description looks very brief, please check if more details can be added.');
	}
}
