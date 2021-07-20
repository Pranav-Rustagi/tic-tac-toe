import { Row, Col, Card, CardHeader, CardBody } from "reactstrap"

const ScoreBoard = ({ score }) => {
    return <Row className="justify-content-around mx-0">
                {
                    Object.entries(score).map((entry, index) => {
                        return <Col className="col-3 p-0" key={index}>
                                    <Card className="text-center border-0">
                                        <CardHeader className="bg-dark text-light">{ entry[0].toLocaleUpperCase() }</CardHeader>
                                        <CardBody className="fs-4 fx-bold py-1">{ entry[1] }</CardBody>
                                    </Card>
                                </Col>
                    })
                }
            </Row>
}

export default ScoreBoard