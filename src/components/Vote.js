import {
  Box,
  Center,
  HStack,
  IconButton,
  Button,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import db from "../firebase.js";
import { useEffect, useState } from "react";
function Vote() {
  const [votes, setVotes] = useState(null);

  async function getVotes(db) {
    const votesCol = collection(db, "today-vote");
    const voteSnapshot = await getDocs(votesCol);
    const voteData = voteSnapshot.docs.map((doc) => doc.data());
    return voteData;
  }
  async function getTime(db) {
    const votesCol = collection(db, "time");
    const voteSnapshot = await getDocs(votesCol);
    const voteData = voteSnapshot.docs.map((doc) => doc.data());
    return voteData;
  }

  async function addLike() {
    await setDoc(doc(db, "today-vote", "votes"), {
      like: votes.like + 1,
      unlike: votes.unlike,
    });
    setVotes({
      like: (votes.like += 1),
      unlike: votes.unlike,
    });
  }

  async function addUnlike() {
    await setDoc(doc(db, "today-vote", "votes"), {
      like: votes.like,
      unlike: votes.unlike + 1,
    });
    setVotes({
      like: votes.like,
      unlike: (votes.unlike += 1),
    });
  }
  async function resetVote() {
    await setDoc(doc(db, "today-vote", "votes"), {
      like: 0,
      unlike: 0,
    });
    setVotes({
      like: 0,
      unlike: 0,
    });
  }
  async function setTime() {
    await setDoc(doc(db, "today-vote", "time"), {
      day: new Date().getDate(),
    });
  }

  //   function percentage(partialValue, totalValue) {
  //     return (100 * partialValue) / totalValue;
  //   }
  useEffect(() => {
    getVotes(db).then((r) => {
      setVotes(r[0]);
    });
    getTime(db).then((r) => {
      if (r !== new Date().getDate()) {
        resetVote();
        setTime();
      }
    });
  }, []);
  return (
    <Center>
      <VStack>
        <HStack>
          <IconButton
            onClick={addLike}
            colorScheme="green"
            icon={<CheckIcon />}
          ></IconButton>
          <IconButton
            onClick={addUnlike}
            colorScheme="red"
            icon={<CloseIcon />}
          ></IconButton>
        </HStack>

        <HStack fontFamily={"Inter"}>
          <Text>{votes?.like}</Text>
          <Text>{votes?.unlike}</Text>
        </HStack>
        <Box>
          <Progress colorScheme="green" value={80}></Progress>
          <Progress colorScheme="red" value={80}></Progress>
        </Box>
      </VStack>
    </Center>
  );
}

export default Vote;
