import { Row, Col, Card, CardHeader, CardBody } from "reactstrap"

const ScoreBoard = ({ score }) => {
    return <Row className="justify-content-between justify-content-md-around align-items-center mx-0 mt-md-auto flex-md-column flex-lg-row">
                {
                    Object.entries(score).map((entry, index) => {
                        return <Col className="p-0 my-1" key={index} lg="3" md="8" xs="3">
                                    <Card className="text-center border-0 d-flex flex-column flex-md-row flex-lg-column overflow-hidden">
                                        <CardHeader className="bg-dark text-light col col-md-5 col-lg-12">{ entry[0].toLocaleUpperCase() }</CardHeader>
                                        <CardBody className="bg-light fs-4 fx-bold py-1 col col-md-7 col-lg-12">{ entry[1] }</CardBody>
                                    </Card>
                                </Col>
                    })
                }
            </Row>
}

export default ScoreBoard