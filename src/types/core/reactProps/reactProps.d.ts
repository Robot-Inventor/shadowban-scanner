/** @see {isCellInnerDivProps} ts-auto-guard:type-guard */
interface CellInnerDivProps {
    children: {
        _owner?: {
            key: string;
        };
    };
}

/**
 * (tombstones' cell inner div) > div > div  <- This element is the tombstone's grandchild and has detailed information.
 * @see {isTombstoneGrandchildProps} ts-auto-guard:type-guard
 */
interface TombstoneGrandchildProps {
    children: [
        {
            props: {
                entry: {
                    type: "tombstone";
                    conversationPosition: {
                        /**
                         * If true, the account may be suspended.
                         * If false, the account may exist but the tweet is hidden.
                         */
                        showReplyContext: boolean;
                    };
                };
            };
        }
    ];
}

export type { CellInnerDivProps, TombstoneGrandchildProps };
