import { Button } from "react-bootstrap";

interface Props {
    btnContext: string
    btnText: string,
    btnLink: string
}

function LinkBtn({ btnContext, btnText, btnLink }: Props) {
    return (
        <>
            <p>{btnContext}</p>
            <Button href={btnLink}>{btnText}</Button>
        </>
    );
}

export default LinkBtn;