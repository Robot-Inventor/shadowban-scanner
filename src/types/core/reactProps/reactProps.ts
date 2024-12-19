import typia from "typia";

interface CellInnerDivProps {
    children: {
        _owner?: {
            key: string;
        };
    };
}

const isCellInnerDivProps = typia.createIs<CellInnerDivProps>();

/**
 * (tombstones' cell inner div) > div > div  <- This element is the tombstone's grandchild and has detailed information.
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

const isTombstoneGrandchildProps = typia.createIs<TombstoneGrandchildProps>();

export { type CellInnerDivProps, isCellInnerDivProps, type TombstoneGrandchildProps, isTombstoneGrandchildProps };
