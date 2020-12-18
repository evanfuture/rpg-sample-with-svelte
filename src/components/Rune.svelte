<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { iRune } from "../api/runes";

    export let rune: iRune;
    export let isActive: boolean;
    export let isLast: boolean = false;

    const dispatch = createEventDispatcher();

    function onClick(e) {
        dispatch("click", { click: "left" });
    }

    function onRightClick(e) {
        dispatch("click", { click: "right" });
    }
</script>

<style type="text/scss">
    @import "../scss/theme";

    .rune {
        width: 100%;
        display: flex;
        align-items: center;

        &:last-child {
            width: auto;
        }

        &__iconWrapper {
            background: linear-gradient(
                180deg,
                $bg-secondary 0%,
                $bg-secondary 50%,
                $bg-secondary-dark 50%,
                $bg-secondary 100%
            );

            .active & {
                box-shadow: 0px 0px 10px 0px rgba($bg-primary-highlight, 0.45);
                background: linear-gradient(
                    180deg,
                    $bg-primary 0%,
                    $bg-primary 50%,
                    $bg-primary-dark 50%,
                    $bg-primary-dim 100%
                );
            }
        }

        &__icon {
            @include button-reset();

            width: 50px;
            height: 50px;
            margin: 4px;
            background: url("/assets/talent-icons-sprite.png");
            background-repeat: no-repeat;
            background-position-x: 0;
            background-position-y: -50px;

            .active &,
            &:hover {
                background-position-y: 0;
            }

            &:focus {
                outline: 1px solid $content-dim;
            }
        }

        &__separator {
            width: 100%;
            height: 18px;
            background-color: $bg-secondary-black;
            border-top: 2px solid $bg-secondary-dark-dim;
            border-bottom: 2px solid $bg-secondary-dark-dim;

            .active & {
                background-color: $bg-secondary-dark;
                border-color: $bg-secondary;
            }
        }

        $sprites: (
            "tp1-a",
            "tp1-b",
            "tp1-c",
            "tp1-d",
            "tp2-a",
            "tp2-b",
            "tp2-c",
            "tp2-d"
        );

        @each $name in $sprites {
            .#{$name} {
                background-position-x: #{(index($sprites, $name) - 1) * -50px};
            }
        }
    }
</style>

<div class="rune {isActive ? 'active' : ''}">
    <div class="rune__iconWrapper">
        <button
            class="rune__icon {rune.id}"
            on:click={onClick}
            on:contextmenu|preventDefault={onRightClick} />
    </div>
    {#if !isLast}
        <div class="rune__separator" />
    {/if}
</div>
