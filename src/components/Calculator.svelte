<script lang="ts">
    import { allTalentPaths } from "../api/api.constants";
    import type { iRune, iRuneClickEvent, iTalentPath } from "../api/runes";
    import TalentPath from "./TalentPath.svelte";

    // userData will eventually come from the API
    let totalPoints = 6;
    let activeRunes: string[] = ["tp1-a", "tp2-a", "tp2-b"];
    let usedPoints;

    let mappedTalentPaths: iTalentPath[];

    $: {
        mappedTalentPaths = allTalentPaths.map((path) => {
            return {
                ...path,
                runes: path.runes.map((rune) => {
                    return {
                        ...rune,
                        active: activeRunes.includes(rune.id),
                    };
                }),
            };
        });
    }

    $: {
        usedPoints = activeRunes.length;
    }

    function removeRune(rune: iRune, path: iTalentPath) {
        const nextPosition = path.runes.findIndex((r) => r.id === rune.id);
        const currentPosition = path.runes.reduce(
            (a, r, i) => (!!r.active ? i : a),
            -1
        );
        const diff = currentPosition - nextPosition;

        const idsToRemove = [...new Array(diff + 1)].map(
            (_, i) => path.runes[currentPosition - i].id
        );

        return activeRunes.filter((r) => !idsToRemove.includes(r));
    }

    function addRune(rune: iRune, path: iTalentPath) {
        if (usedPoints === totalPoints) {
            return activeRunes;
        }

        const nextPosition = path.runes.findIndex((r) => r.id === rune.id);
        const currentPosition = path.runes.reduce(
            (a, r, i) => (!!r.active ? i : a),
            -1
        );
        const diff = nextPosition - currentPosition;
        if (usedPoints + diff > totalPoints) {
            return activeRunes;
        }
        const newIds = [...new Array(diff)].map(
            (_, i) => path.runes[currentPosition + 1 + i].id
        );
        return [...activeRunes, ...newIds];
    }

    function onRuneClick(event: CustomEvent<iRuneClickEvent>) {
        const { rune, path, click } = event.detail;

        if (click === "left" && !rune.active) {
            activeRunes = addRune(rune, path);
        }

        if (click === "right" && rune.active) {
            activeRunes = removeRune(rune, path);
        }

        // send updated data to server here
    }
</script>

<style type="text/scss">
    @import "../scss/theme";

    .calculator {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;

        @media (min-width: $bp-medium) {
            flex-direction: row;
        }
    }

    .points {
        width: 200px;
        padding: 20px;
        margin: 0 auto;
        border: 2px solid $bg-color-dim;
        text-align: center;
        font-size: 1.8em;
        font-weight: 100;

        @media (min-width: $bp-medium) {
            margin: 0 45px 0 75px;
        }

        &__label {
            color: $content-primary-dim;
        }
    }

    .paths {
        flex-grow: 1;
        padding: 80px 0 60px;
        width: 100%;

        @media (min-width: $bp-medium) {
            width: auto;
        }
    }
</style>

<div class="calculator">
    <div class="paths">
        {#each mappedTalentPaths as path (path.id)}
            <TalentPath {path} on:runeClick={onRuneClick} />
        {/each}
    </div>
    <div class="points">
        <div class="points__count">{usedPoints} / {totalPoints}</div>
        <div class="points__label">Points Spent</div>
    </div>
</div>
