<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { iRune, iRuneClickEvent, iTalentPath } from "../api/runes";
    import Rune from "./Rune.svelte";

    export let path: iTalentPath;
    const dispatch = createEventDispatcher();

    function onRuneClick(
        rune: iRune,
        e: CustomEvent<{ click: "left" | "right" }>
    ) {
        const details: iRuneClickEvent = {
            rune,
            path,
            click: e.detail.click,
        };
        dispatch("runeClick", details);
    }
</script>

<style type="text/scss">
    @import "../scss/theme";

    .path {
        @media (min-width: $bp-small) {
            display: flex;
            align-items: center;
        }

        &:not(:last-child) {
            margin-bottom: 50px;
        }

        &__title {
            text-transform: uppercase;
            font-size: 0.85em;
            font-weight: bold;
            color: $content-dim;
            margin-right: 45px;
        }

        &__runes {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
        }
    }
</style>

<div class="path">
    <h2 class="path__title">{path.title}</h2>
    <div class="path__runes">
        {#each path.runes as rune, i (rune.id)}
            <Rune
                {rune}
                isActive={rune.active}
                isLast={i === path.runes.length}
                on:click={(e) => onRuneClick(rune, e)} />
        {/each}
    </div>
</div>
