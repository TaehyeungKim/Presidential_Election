type DataSet<T> = {
    [l in number]: T
}

type IndividualElectionData = {
    // name : {index: data}
    [k in string]: DataSet<number>
}

type MetaData = {
    개표율: DataSet<number>,
    계: DataSet<number>,
    시도명: DataSet<string>,
    선거인수: DataSet<number>,
    투표수: DataSet<number>
}

export type ElectionData = IndividualElectionData & MetaData